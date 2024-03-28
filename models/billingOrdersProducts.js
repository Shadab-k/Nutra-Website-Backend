// Import necessary modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the model
const billingOrdersProducts = sequelize.define('billingOrdersProducts', {
  bolt_order_product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_product_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  bolt_order_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: DataTypes.STRING,
  product_alias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  package_group_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  variation_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tax_class: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subtotal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  subtotal_tax: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  taxes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  total_tax: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  sku: DataTypes.STRING,
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  product_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_site_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_ro_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  market_place_product_line_no: {
    type: DataTypes.STRING,
    allowNull: true
  },
  product_cost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
//   product_date_created: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
}, {
  tableName: 'bolt_order_product', 
  timestamps: false // Set to true if the table has createdAt and updatedAt columns
});

// Export the model
module.exports = billingOrdersProducts;
