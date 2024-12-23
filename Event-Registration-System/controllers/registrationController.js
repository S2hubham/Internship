const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    
    const existingRegistration = await Registration.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    
    const registration = new Registration({ user: req.user._id, event: eventId });
    await registration.save();

    res.status(201).json({ message: 'Successfully registered for the event', registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate('event');
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to cancel this registration' });
    }

    
    registration.status = 'cancelled';
    await registration.save();

    res.status(200).json({ message: 'Registration cancelled successfully', registration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
