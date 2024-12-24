const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getOrders } = require('../controllers/orders');
const { orderSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');


const validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }
    next();
};


router.get('/', getOrders); 
router.post('/new', validateOrder, createOrder); 
router.put('/:id/status', updateOrderStatus); 

module.exports = router;
