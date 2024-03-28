const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.INTEGER, // Assuming status is an integer field
      allowNull: false, // Or true if it can be null
      defaultValue: 0, // Or any default value you want
    },

    dc_user_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "bolt_dc_user_master",
    timestamps: true, // Enable timestamps
    // createdAt: "added_date", // Customize the name of the createdAt field if needed
    updatedAt: false,
  }
);

module.exports = User;
