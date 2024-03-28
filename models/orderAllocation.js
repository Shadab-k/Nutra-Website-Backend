// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the model
const orderAllocation = sequelize.define(
  "orderAllocation",
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

    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assigned_tranporter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigned_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigned_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assigned_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order_status_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_status_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    latest_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assigned_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigned_by_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigned_date1: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modify_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modify_by_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modify_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    assigned_status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1=>Assigned,2=>Re-assigned,3=>unassigned",
    },
    status_changed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_changed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Inserted_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mail_sent_flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    confirmed_flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payment_flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // DCPA Allocation Index
  },
  {
    tableName: "bolt_dc_order_allocation",
    timestamps: false,
  }
);

// Export the model
module.exports = orderAllocation;
