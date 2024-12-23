const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const { createEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

router.post('/', isAdmin, createEvent);
router.get('/', getEvents);

module.exports = router;
