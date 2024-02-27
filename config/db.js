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
        // Sync models after importing
        await User.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
