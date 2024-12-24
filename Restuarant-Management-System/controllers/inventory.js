const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
    const inventory = await Inventory.find();
    res.json(inventory);
};

exports.addInventoryItem = async (req, res) => {
    const { name, quantity, unit, lowStockThreshold, category, expirationDate } = req.body;
    const item = new Inventory({ name, quantity, unit, lowStockThreshold, category, expirationDate });
    await item.save();
    res.status(201).json(item);
};

exports.updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const { quantity, unit, lowStockThreshold, category, expirationDate } = req.body;

    const item = await Inventory.findByIdAndUpdate(
        id,
        { quantity, unit, lowStockThreshold, category, expirationDate },
        { new: true }
    );

    if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(item);
};
