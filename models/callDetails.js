// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const callDetail = sequelize.define('callDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bolt_order_id: DataTypes.INTEGER,
  order_id: DataTypes.BIGINT,
  call_pin: DataTypes.INTEGER,
  channel_type: DataTypes.INTEGER,
  transporter: {
    type: DataTypes.STRING,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  rider_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rider_user_id: {
    type: DataTypes.STRING(250),
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  call_pin_allocate_status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    comment: '1 => allocated, 2 => deallocated'
  },
  allocated_date: DataTypes.DATE,
  response_text: {
    type: DataTypes.TEXT,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  status: {
    type: DataTypes.STRING,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  response: {
    type: DataTypes.TEXT,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },
  response_date_time: DataTypes.DATE,
  phone_number: DataTypes.BIGINT,
  knowlarity_number: {
    type: DataTypes.STRING,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
}, {
  tableName: ' bolt_order_call_pin_mapping'
});

// Export the model
module.exports = callDetail;
