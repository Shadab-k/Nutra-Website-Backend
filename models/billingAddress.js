// Define the model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const billingAddress = sequelize.define(
  "billingAddress",
  {
    // Columns definition
    bolt_order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    billing_first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    billing_address_1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_address_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    billing_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_postcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_country: {
      type: DataTypes.STRING,
      defaultValue: "India",
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    billing_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_alt_phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_street_address_village: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_street_address2_village: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_tehsil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_district_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_post_office: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_road: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    billing_area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entrydatetime: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    // Define table name and turn off timestamps
    tableName: "bolt_billing_address",
    timestamps: false,
  }
);

module.exports = billingAddress;
