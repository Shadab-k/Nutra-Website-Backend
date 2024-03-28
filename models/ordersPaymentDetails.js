// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the model
const ordersPaymentDetails = sequelize.define(
  "ordersPaymentDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bolt_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(50),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    discount_total: {
      type: DataTypes.STRING(255),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    shipping_total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(200),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    payment_method_title: {
      type: DataTypes.STRING(200),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    payment_wallet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coupon_code: {
      type: DataTypes.STRING(255),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    coupon_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    coupon_type: {
      type: DataTypes.STRING(255),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING(255),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
      defaultValue: "Pending",
    },
    payment_status_wallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    online_message: {
      type: DataTypes.TEXT,
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
    payment_type: {
      type: DataTypes.STRING(255),
      charset: "latin1",
      collate: "latin1_swedish_ci",
      allowNull: true,
    },
  },
  {
    tableName: "dhc_order_payment_datails",
    timestamps: false,
  }
);

// Export the model
module.exports = ordersPaymentDetails;
