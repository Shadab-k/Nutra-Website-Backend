// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const logisticReason = sequelize.define('logisticReason', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reason_code: {
    type: DataTypes.STRING(225),
    collation: 'latin1_swedish_ci'
  },
  reason_name: {
    type: DataTypes.STRING(250),
    collation: 'latin1_swedish_ci'
  },
  logistics_status_code: {
    type: DataTypes.STRING(225),
    collation: 'latin1_swedish_ci'
  },
  logistic_name: {
    type: DataTypes.STRING(225),
    collation: 'latin1_swedish_ci'
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bolt_dc_logistic_reason',
  timestamps: false
});

// Export the model
module.exports = logisticReason;
