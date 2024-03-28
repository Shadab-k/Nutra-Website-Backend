// Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the model for the table
const orderLogistic = sequelize.define('orderLogistic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    boltOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    logisticsChannelType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logisticName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    logistics: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    awbNo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    logisticRemarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ndrSubStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ndrComment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logisticsUdReasonFlag: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    logisticsUndeliveredReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logisticsUdReasonDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    newDeliveryLocation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    futureDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ndrAttempts: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    transporterStatus: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transporterSubStatus: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transporterSubSubStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    courierRemarksTag: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transporterStatusDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    affeyName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    affeyNumber: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    deliveryAfterContent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deliveryAfterDate1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryTat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryStartTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    deliveryEndTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ptpDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deliveryAfterDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pendingOfdCallFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ofdCallFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ndrCallFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    rtoReqCallFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    rtoRequestFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ofdRtoReqCallFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, 

  {
    tableName : "dhc_order_logistic",
    timestamps: false,
  }
  );
  module.exports = orderLogistic;