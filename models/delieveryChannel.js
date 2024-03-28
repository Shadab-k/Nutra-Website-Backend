// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const deliveryChannel = sequelize.define('deliveryChannel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_channel: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  transporter_code: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  transporter_name: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  address1: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  address2: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  address3: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  State: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Pincode: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  country: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  email_address: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  billing_type: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  billing_method: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  payout: {
    type: DataTypes.STRING(250),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  security_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  threshold: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  cod_charges: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  cod_charges_per: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  Currency: {
    type: DataTypes.STRING(225),
    charset: 'latin1',
    collate: 'latin1_swedish_ci',
    allowNull: true
  },
  payoutType: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  wareHouse: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  added_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  added_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  modify_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  modify_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  api_available_option: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status_changed_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status_changed_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'bolt_transporter_masters',
  timestamps: false
});

// Export the model
module.exports = deliveryChannel;
