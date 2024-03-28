// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const orderStatus = sequelize.define('orderStatus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_status: {
    type: DataTypes.STRING(100),
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  status_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '0 => Inactive, 1 => Active'
  },
//   created_by: {
//     type: DataTypes.STRING(100),
//     charset: 'utf8',
//     collate: 'utf8_general_ci'
//   },
//   entry_date: DataTypes.DATEONLY,
//   modified_by: DataTypes.INTEGER,
//   updated_date: DataTypes.DATEONLY,
  short_code: {
    type: DataTypes.STRING(10),
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
}, {
  tableName: ' bolt_order_status_master'
});

// Export the model
module.exports = orderStatus;
