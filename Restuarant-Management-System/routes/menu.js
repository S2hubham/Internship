const express = require('express');
const router = express.Router();
const { addMenuItem, updateMenuItem, getMenu } = require('../controllers/menu');
const { menuItemSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');

// Middleware for validating menu requests
const validateMenuItem = (req, res, next) => {
    const { error } = menuItemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }
    next();
};

// Routes
router.get('/', getMenu); // Fetch menu
router.post('/new', validateMenuItem, addMenuItem); // Add menu item
router.put('/:id', validateMenuItem, updateMenuItem); // Update menu item

module.exports = router;
