
const Table = require('../models/Table');


exports.getTables = async (req, res) => {
    const tables = await Table.find();
    res.json(tables);
};


exports.reserveTable = async (req, res) => {
    const { id } = req.params; 
    const table = await Table.findByIdAndUpdate(id, { reserved: true }, { new: true });

    if (!table) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.json({ message: 'Table reserved successfully!', table });
};

 
exports.updateTable = async (req, res) => {
    const { id } = req.params;  
    const { reserved, seats, location } = req.body;

    const table = await Table.findByIdAndUpdate(
        id,
        { reserved, seats, location },  
        { new: true }  
    );

    if (!table) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.json(table);
};
