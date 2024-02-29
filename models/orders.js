// Import required modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); // Import the User model

// Define the Orders model
const Orders = sequelize.define(
  "Orders",
  {
    user: {
      type: DataTypes.INTEGER, // Assuming userId is of type INTEGER
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id", // Reference the primary key of the User model
      },
    },

    Order_Id: {
      type: DataTypes.UUID, // Use UUID type for Order_Id
      defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
      allowNull: false,
      primaryKey: true, // Define Order_Id as primary key
    },

    Order_Date: {
      type: DataTypes.DATEONLY, // Use DATE type for Order_Date
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Cust_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    COD_Amt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alt_mobile_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: true, // Define timestamps for createdAt and updatedAt
    createdAt: "created_at", // Define custom column name for createdAt
    updatedAt: "updated_at", // Define custom column name for updatedAt
  }
);

module.exports = Orders;
