const express = require('express');
const router = express.Router();
const { getSalesReport } = require('../controllers/reports');
const { reportQuerySchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');


const validateReportQuery = (req, res, next) => {
    const { error } = reportQuerySchema.validate(req.query);
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }
    next();
};


router.get('/generate', validateReportQuery, getSalesReport); 

module.exports = router;
