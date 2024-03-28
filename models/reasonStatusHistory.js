// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the model for the table
const reasonStatusHistory = sequelize.define(
  "reasonStatusHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
 
    bolt_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatusReason: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    statusBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    commentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "bolt_dc_order_status_history", // Removed the extra space
    timestamps: false,
  }
);

module.exports = reasonStatusHistory;
