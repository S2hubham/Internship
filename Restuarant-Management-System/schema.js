const Joi = require('joi');


const orderSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            menuItem: Joi.string().required(), 
            quantity: Joi.number().integer().min(1).required(),
        })
    ).required(),
    table: Joi.string().required(), 
    total: Joi.number().min(0).required(),
});


const tableSchema = Joi.object({
    number: Joi.number().integer().min(1).required(),
    capacity: Joi.number().integer().min(1).required(),
    reserved: Joi.boolean().default(false),
});


const inventorySchema = Joi.object({
    name: Joi.string().required(),                            
    quantity: Joi.number().integer().min(0).required(),       
    unit: Joi.string().required(),                             
    lowStockThreshold: Joi.number().integer().min(0).default(5), 
    category: Joi.string().valid('Ingredients', 'Spices', 'Beverages', 'Equipment', 'Misc').required(), 
    expirationDate: Joi.date().greater('now').optional(),     
});


const menuItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').default(''), 
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    available: Joi.boolean().default(true),
});


const reportQuerySchema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
});


module.exports = {
    orderSchema,
    tableSchema,
    inventorySchema,
    menuItemSchema,
    reportQuerySchema,
};
