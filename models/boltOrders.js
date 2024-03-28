// Import necessary modules
const { DataTypes } = require('sequelize');
const User = require("../models/user")
const sequelize = require('../config/db');

// Define the model
const boltOrders = sequelize.define('boltOrders', {
  bolt_order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  // Define user_id as a foreign key referencing the id field of the User model
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assuming each bolt order must belong to a user
    references: {
      model: User,
      key: 'id'
    }
  },
  ro_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'RO of user who created order'
  },
  site_id: DataTypes.INTEGER,
  processid: DataTypes.INTEGER,
  department_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
  sub_status: DataTypes.INTEGER,
  profile: DataTypes.STRING,
  status_date: { // Corrected field name
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_datetime', // Corrected field mapping
    allowNull: false // or true, depending on your requirements
  },
  
  department: DataTypes.STRING,
  status_owner_id: DataTypes.INTEGER,
  shipped_date: DataTypes.DATE,
  ofdattempt1_date: DataTypes.DATE,
  ndrattempt1_date: DataTypes.DATE,
  ofd_date: DataTypes.DATE,
  ndr_date: DataTypes.DATE,
  rto_date: DataTypes.DATE,
  rto_request_date: DataTypes.DATE,
  rto_reason: DataTypes.TEXT,
  delivered_date: DataTypes.DATE,
  cod_confirmed_flag: DataTypes.INTEGER,
  cod_confirmed_flag_date: DataTypes.DATE,
  cod_old_confirmed_flag_date: DataTypes.DATE,
  brand_name: DataTypes.STRING,
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  channel: DataTypes.STRING,
  sources: DataTypes.STRING,
  compagin: DataTypes.STRING,
  e_date_time: DataTypes.DATE,
  e_date: DataTypes.DATE,
  lead_id: DataTypes.BIGINT,
  customer_id: DataTypes.BIGINT,
  active_order_stage_flag: DataTypes.STRING,
  active_order_stage_flag_date: DataTypes.DATE,
  active_order_flag: DataTypes.STRING,
  order_assigned_user: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  order_assigned_user_department: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  order_assigned_processid: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  order_assigned_date: DataTypes.DATE,
  lead_packet: DataTypes.STRING,
  dialer_upload_flag: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stop_upload_lead: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  blastert_upload_flg: DataTypes.STRING,
  telephone: DataTypes.STRING,
  shipping_phone: DataTypes.STRING,
  billing_phone: DataTypes.STRING,
  whatsapp_number: DataTypes.STRING,
  alt_phone_number: DataTypes.STRING,
  sale_source: DataTypes.STRING,
  created_via: DataTypes.STRING,
  created_via_flag: DataTypes.INTEGER,
  invoice_prefix: DataTypes.STRING,
  invoice_id: DataTypes.BIGINT,
  ref_order_id: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  sub_status_owner_departmet_id: DataTypes.INTEGER,
  sub_status_updated_datetime: {
    type: DataTypes.DATE,
    field: 'sub_status_date',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false // or true, depending on your requirements
  },
  date_created: DataTypes.DATE,
  bolt_customer_id: DataTypes.BIGINT,
  parent_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sub_sub_status: DataTypes.INTEGER,
  bolt_order_ref_id: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  dstPhone: DataTypes.STRING,
  current_process_flag: DataTypes.INTEGER,
  current_sub_process_flag: DataTypes.INTEGER,
  market_place_code: DataTypes.STRING,
  cod_sub_sub_status: DataTypes.STRING,
  order_allocation_flag: DataTypes.INTEGER,
  shipping_postcode: DataTypes.STRING,
  lead_bucket: DataTypes.INTEGER,
  serviceable_flag: DataTypes.INTEGER,
  updated_by: DataTypes.STRING,
  order_type_id: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  order_cat_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  pct_order_ref_id: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  pct_bolt_order_ref_id: {
    type: DataTypes.BIGINT,
    defaultValue: 0
  },
  rto_not_contact_flag: DataTypes.STRING,
  lpk_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lpk_name: DataTypes.STRING,
  dialer_upload_date: DataTypes.DATE,
  category_id: DataTypes.INTEGER,
  temp_order_id: DataTypes.BIGINT,
  emp_stage: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  shipped_datetime: DataTypes.DATE,
  first_attempt_datetime: DataTypes.DATE,
  cron_status: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  delivery_add_on: DataTypes.STRING
}, {
  tableName: 'bolt_order',
  timestamps: true, // Enable timestamps
  createdAt: 'created_at', // Optional: Change the name of the createdAt column
  updatedAt: false
});

// Define association with User model
boltOrders.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

// Export the model
module.exports = boltOrders;
