// config/db.js
const { Sequelize } = require("sequelize");




// Create a new Sequelize instance
const sequelize = new Sequelize("nutrawebsite", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Import models after the database connection is established
    const User = require("../models/user");
    const Orders = require("../models/orders");
    const Inventory = require("../models/inventory");
    const Transporter = require("../models/Transporter");
    const billingAddress = require("../models/billingAddress");
    const orderAllocation = require("../models/orderAllocation");
    const boltOrders = require("../models/boltOrders");
    const callDetail = require("../models/callDetails");
    const orderStatus = require("../models/ordersStatus");
    const ordersSubStatus = require("../models/ordersSubStatus");
    const ordersPaymentDetails = require("../models/ordersPaymentDetails");
    const billingOrdersProducts = require("../models/billingOrdersProducts");
    const reasonStatusHistory = require("../models/reasonStatusHistory");
    const orderLogistic = require("../models/orderLogistics");

    // Sync models after importing
    await User.sync();
    await Orders.sync();
    await Inventory.sync();
    await Transporter.sync();
    await billingAddress.sync();
    await orderAllocation.sync();
    await boltOrders.sync();
    await callDetail.sync();
    await orderStatus.sync();
    await ordersSubStatus.sync();
    await ordersPaymentDetails.sync();
    await billingOrdersProducts.sync()
    await reasonStatusHistory.sync()
    await orderLogistic.sync()
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
