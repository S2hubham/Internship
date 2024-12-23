const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, createdBy: req.user._id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
