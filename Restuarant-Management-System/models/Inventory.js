const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,              
    quantity: Number,          
    unit: String,              
    lowStockThreshold: Number, 
    category: {                
        type: String,
        enum: ['Ingredients', 'Spices', 'Beverages', 'Equipment', 'Misc'],
        required: true
    },
    expirationDate: Date,      
});

module.exports = mongoose.model('Inventory', inventorySchema);
