// Import required modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user"); // Import the User model

// Define the Orders model
const Inventory = sequelize.define(
  "Inventory",
  {
    user: {
      type: DataTypes.INTEGER, // Assuming userId is of type INTEGER
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id", // Reference the primary key of the User model
      },
    },
    Date: {
      type: DataTypes.DATEONLY, // Use DATE type for Order_Date
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    SKU_Code: {
        type: DataTypes.UUID, // Use UUID type for Order_Id
        defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        allowNull: false,
        primaryKey: true, // Define Order_Id as primary key
      },

    Cust_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Issued_Qty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Delivered: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Damage_Lost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Balance_Qty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "inventory",
  }
);

module.exports = Inventory;


