// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const ordersSubStatus = sequelize.define('ordersSubStatus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_status_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'parent order status id'
  },
  name: {
    type: DataTypes.STRING(255),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '1 => Auto, 2 => Manual'
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date_added: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  modified_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date_modified: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bolt_order_sub_status_master',
  timestamps: false
});

// Export the model
module.exports = ordersSubStatus;
