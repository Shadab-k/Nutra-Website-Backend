const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Transporter = require("./Transporter");

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

    login_id: {
      type: DataTypes.STRING,
      allowNull: false,
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

    tranporter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    site_location: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1=>SMS,2=>Whatsapp",
    },
    added_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modify_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status_changed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_changed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    secret_question: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    device_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    call_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    enable_call_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "bolt_dc_user_master",
    // tableName: "bolt_transporter_masters",
    timestamps: true, // Enable timestamps
    createdAt: "added_date", // Customize the name of the createdAt field if needed
    updatedAt: false,
  }
);

User.belongsTo(Transporter, { foreignKey: "tranporter_id", targetKey: "id" });
module.exports = User;
