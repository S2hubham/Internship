const express = require('express');
const router = express.Router();
const { addInventoryItem, updateInventoryItem, getInventory } = require('../controllers/inventory'); 
const { inventorySchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');


const validateInventory = (req, res, next) => {
    const { error } = inventorySchema.validate(req.body); 
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }
    next();
};


router.get('/', getInventory); 
router.post('/new', validateInventory, addInventoryItem); 
router.put('/:id', validateInventory, updateInventoryItem); 

module.exports = router;
