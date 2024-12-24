const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{ menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, quantity: Number }],
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    status: { type: String, enum: ['Pending', 'Prepared', 'Served', 'Canceled'], default: 'Pending' },
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
