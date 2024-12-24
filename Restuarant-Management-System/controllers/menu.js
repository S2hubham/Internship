const MenuItem = require('../models/MenuItem');

exports.getMenu = async (req, res) => {
    const menu = await MenuItem.find({ available: true });
    res.json(menu);
};

exports.addMenuItem = async (req, res) => {
    const { name, description, price, category } = req.body;
    const menuItem = new MenuItem({ name, description, price, category });
    await menuItem.save();
    res.status(201).json(menuItem);
};

exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;  // The ID of the item to be updated
    const { name, description, price, category, available } = req.body;

    // Find the menu item by ID and update with the provided data
    const menuItem = await MenuItem.findByIdAndUpdate(
        id, 
        { name, description, price, category, available }, 
        { new: true } // Returns the updated item
    );

    if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(menuItem); // Respond with the updated menu item
};
