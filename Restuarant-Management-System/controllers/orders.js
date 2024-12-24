const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { items, table, total } = req.body;
    const order = new Order({ items, table, total });
    await order.save();
    res.status(201).json(order);
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();  
        res.json(orders);
    } catch (error) {
        throw new ExpressError('Error fetching orders', 500);
    }
};
