const Order = require('../models/Order');

exports.getSalesReport = async (req, res) => {
    const sales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: '$total' } } }
    ]);
    res.json(sales);
};
