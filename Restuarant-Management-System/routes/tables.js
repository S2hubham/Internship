
const express = require('express');
const router = express.Router();
const { getTables, reserveTable, updateTable } = require('../controllers/tables');
const { tableSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');


const validateTable = (req, res, next) => {
    const { error } = tableSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }
    next();
};


router.get('/', getTables);  
router.post('/reserve/:id', reserveTable);  
router.put('/:id', validateTable, updateTable); 

module.exports = router; 
