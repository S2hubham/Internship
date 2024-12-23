const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const {
  registerForEvent,
  getUserRegistrations,
  cancelRegistration,
} = require('../controllers/registrationController');

const router = express.Router();


router.post('/:eventId', isAuthenticated, registerForEvent);


router.get('/', isAuthenticated, getUserRegistrations);


router.delete('/:registrationId', isAuthenticated, cancelRegistration);

module.exports = router;
