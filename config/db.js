// config/db.js
const { Sequelize } = require('sequelize');


// Create a new Sequelize instance
const sequelize = new Sequelize('nutrawebsite', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Import models after the database connection is established
        const User = require('../models/user');
        const Orders = require('../models/orders')
        const Inventory = require("../models/inventory")
        const Transporter = require('../models/Transporter')
        // Sync models after importing
        await User.sync();
        await Orders.sync()
        await Inventory.sync()
        await Transporter.sync()
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
