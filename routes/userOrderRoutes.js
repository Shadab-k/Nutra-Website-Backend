const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Orders = require("../models/orders");
const User = require("../models/user");
const sequelize = require("../config/db");
const OrderAllocation = require("../models/orderAllocation");
const PaymentDetails = require("../models/ordersPaymentDetails");
const OrderStatusReason = require("../models/logisticReason");
const OrderStatusMaster = require("../models/ordersStatus")
const reasonStatusHistory = require('../models/reasonStatusHistory')
const OrderLogistic = require("../models/orderLogistics")
const BoltOrder = require('../models/boltOrders')



// router.put("/user/updateorders/:orderId", fetchUser, async (req, res) => {
//   const { orderId } = req.params;
//   const { paymentMethod, remark, orderStatus } = req.body;

//   try {
//     // Check if the authenticated user is authorized to update the order
//     // Assuming req.user.id contains the ID of the authenticated user
//     const orderAllocation = await OrderAllocation.findOne({
//       where: {
//         assigned_id: req.user.id, // Check if the user is assigned to the order
//         assigned_status: {
//           [Op.in]: [1, 2], // Check if the order is assigned or re-assigned
//         },
//         bolt_order_id: orderId, // Check if the order ID matches the requested order
//       },
//     });

//     console.log("req user id", req.user.id);
//     console.log("Order Allocation:", orderAllocation);
//     console.log("Order ID", orderId);

//     // If no order allocation is found for the user and order ID, return unauthorized access
//     if (!orderAllocation) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     // Update payment method for the table ordersPaymentDetails
//     await OrderPaymentDetails.update(
//       { payment_method: paymentMethod },
//       { where: { bolt_order_id: orderId } }
//     );

//     // Update remark for the table reasonStatusHistory
//     await OrderStatusHistory.update(
//       { remark: remark },
//       { where: { bolt_order_id: orderId } }
//     );

//     // Update order status for the table orderLogistic
//     let updatedStatusId;
//     if (orderStatus === "delivered") {
//       updatedStatusId = 19;
//     } else if (orderStatus === "undelivered") {
//       updatedStatusId = 20;
//     } else {
//       return res.status(400).json({ error: "Invalid order status" });
//     }

//     // Update the order status in orderLogistic table
//     await OrderStatusMaster.update(
//       { order_status: updatedStatusId },
//       { where: { bolt_order_id: orderId } }
//     );

//     // Send success response
//     res.json({ message: "Orders updated successfully" });
//   } catch (error) {
//     // Handle errors
//     console.error("Error updating orders:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// router.put("/users/update-orders/:orderId", fetchUser, async (req, res) => {
//   const { orderId } = req.params;
//   const { paymentMethod, remark, orderStatus } = req.body;

//   try {
//     // Check if the authenticated user is authorized to update the order
//     const orderAllocation = await sequelize.query(
//       `SELECT * FROM bolt_dc_order_allocation
//       WHERE assigned_id = :userId
//       AND assigned_status IN (1, 2)
//       AND bolt_order_id = :orderId
//       LIMIT 1`,
//       {
//         replacements: { userId: req.user.id, orderId: orderId },
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     // If no order allocation is found for the user and order ID, return unauthorized access
//     if (orderAllocation.length === 0) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     // Update payment method for the table ordersPaymentDetails
//     await sequelize.query(
//       `UPDATE ordersPaymentDetails
//       SET payment_method = :paymentMethod
//       WHERE bolt_order_id = :orderId`,
//       {
//         replacements: { paymentMethod: paymentMethod, orderId: orderId },
//         type: sequelize.QueryTypes.UPDATE,
//       }
//     );

//     // Update remark for the table reasonStatusHistory
//     await sequelize.query(
//       `UPDATE reasonStatusHistory
//       SET remark = :remark
//       WHERE bolt_order_id = :orderId`,
//       {
//         replacements: { remark: remark, orderId: orderId },
//         type: sequelize.QueryTypes.UPDATE,
//       }
//     );

//     // Update order status for the table orderLogistic
//     let updatedStatusId;
//     if (orderStatus === 'delivered') {
//       updatedStatusId = 19;
//     } else if (orderStatus === 'undelivered') {
//       updatedStatusId = 20;
//     } else {
//       return res.status(400).json({ error: "Invalid order status" });
//     }

//     await sequelize.query(
//       `UPDATE orderLogistic
//       SET order_status = :updatedStatusId
//       WHERE bolt_order_id = :orderId`,
//       {
//         replacements: { updatedStatusId: updatedStatusId, orderId: orderId },
//         type: sequelize.QueryTypes.UPDATE,
//       }
//     );

//     // Send success response
//     res.json({ message: "Orders updated successfully" });
//   } catch (error) {
//     // Handle errors
//     console.error("Error updating orders:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/users/get-orders", fetchUser, async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Execute raw SQL query
    const userOrders = await sequelize.query(
      `SELECT 
          o.order_id, 
          o.bolt_order_id, 
          o.date_created, 
          o.e_date_time, 
          o.created_via, 
          o.created_via_flag, 
          o.status, 
          o.sub_status, 
          o.department, 
          o.updated_datetime, 
          p.discount_total, 
          p.total, 
          p.payment_method, 
          p.payment_method_title, 
          l.assigned_date, 
          l.Inserted_datetime, 
          l.id as allocation_id, 
          o.delivered_date, 
          p.payment_wallet_id, 
          o.telephone, 
          b.address_type, 
          b.billing_first_name as first_name, 
          b.billing_last_name as last_name, 
          b.billing_first_name, 
          b.billing_last_name, 
          l.*, 
          s.name, 
          b.billing_address_1, 
          b.billing_alt_phone_number, 
          b.billing_address_2, 
          b.billing_city, 
          b.billing_state, 
          b.billing_postcode, 
          m.call_pin, 
          m.knowlarity_number, 
          b.billing_post_office, 
          b.billing_street_address_village, 
          b.billing_street_address2_village, 
          b.billing_landmark, 
          b.billing_area, 
          b.billing_road, 
          E.order_status as status,
          bp.name AS product_name,
          bp.product_id,
          bp.sku,
          bp.quantity AS product_quantity,
          bp.price AS product_price
      FROM 
          bolt_dc_order_allocation l 
          LEFT JOIN bolt_order o ON o.bolt_order_id = l.bolt_order_id 
          LEFT JOIN bolt_billing_address b ON b.bolt_order_id = o.bolt_order_id 
          LEFT JOIN bolt_order_status_master E ON o.status = E.id 
          LEFT JOIN bolt_order_sub_status_master s ON o.sub_status = s.id 
          LEFT JOIN bolt_order_call_pin_mapping m ON o.bolt_order_id = m.bolt_order_id 
          LEFT JOIN dhc_order_payment_datails p ON o.bolt_order_id = p.bolt_order_id 
          LEFT JOIN bolt_order_product bp ON o.bolt_order_id = bp.bolt_order_id
      WHERE 
          l.assigned_id = :userId 
          AND l.assigned_status IN (1, 2) 
          AND o.status IN (11)
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Group orders by order_id
    const groupedOrders = userOrders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          ...order,
          products: [],
        };
      }
      acc[order.order_id].products.push({
        name: order.product_name,
        product_id: order.product_id,
        sku: order.sku,
        quantity: order.product_quantity,
        price: order.product_price,
      });
      return acc;
    }, {});

    // Convert object back to array of orders
    const formattedOrders = Object.values(groupedOrders);

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define the route to update orders
// router.put("/users/update-orders/:orderId", fetchUser, async (req, res) => {
//   const { orderId } = req.params;
//   const { paymentMethod, remark, orderStatus } = req.body;

//   try {
//     // Validate order status
//     const validStatuses = ["Delivered", "Undelivered"];
//     if (!validStatuses.includes(orderStatus)) {
//       return res.status(400).json({ error: "Invalid order status" });
//     }

//     // Update payment method for the order
//     await OrderPaymentDetails.update(
//       { payment_method: paymentMethod },
//       { where: { bolt_order_id: orderId } }
//     );

//     // Update remark for the order
//     await OrderStatusHistory.update(
//       { remark: remark },
//       { where: { bolt_order_id: orderId } }
//     );

//     // Update order status
//     let updatedStatusId;
//     if (orderStatus === "Delivered") {
//       updatedStatusId = 19; // Assuming 19 represents 'delivered' status
//     } else if (orderStatus === "Undelivered") {
//       updatedStatusId = 20; // Assuming 20 represents 'undelivered' status
//     }

//     if (updatedStatusId) {
//       await OrderStatusMaster.update(
//         { order_status: updatedStatusId },
//         { where: { bolt_order_id: orderId } }
//       );
//     }

//     // Send success response
//     res.json({ message: "Orders updated successfully" });
//   } catch (error) {
//     console.error("Error updating orders:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// // });
// router.put('/update/:orderId', fetchUser, async (req, res) => {
//   try {
//     const { paymentMode, orderStatus, remark, reason } = req.body;
//     const { orderId } = req.params;
//     const userId = req.user.id;

//     // Define conditions for update queries
//     const updateConditions = { userId, id: orderId };

//     // Update payment method in dhc_order_payment_details table
//     if (paymentMode) {
//       await PaymentDetails.update({ paymentMethod: paymentMode }, { where: updateConditions });
//     }

//     // Update order status in bolt_order_status_master table
//     if (orderStatus) {
//       await OrderStatusMaster.update({ orderStatus }, { where: updateConditions });
//     }

//     // Update remark in bolt_dc_order_status_history table
//     if (remark) {
//       await OrderStatusHistory.update({ remark }, { where: updateConditions });
//     }

//     // Update reason in bolt_dc_order_status_reason table
//     if (reason) {
//       await OrderStatusReason.update({ reason }, { where: updateConditions });
//     }

//     res.status(200).json({ message: "Data updated successfully" });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// router.put('/update/:orderId', fetchUser, async (req, res) => {
//   try {
//     const { paymentMode, orderStatus, remark, reason } = req.body;
//     const { orderId } = req.params;
//     const userId = req.user.id;

//     // Define conditions for update queries
//     const updateConditions = { id: orderId }; // Removed userId as it's not used in the update queries

//     // Update payment method, payment wallet, and payment method title in dhc_order_payment_details table
//     if (paymentMode) {
//       let paymentMethod;
//       let paymentMethodTitle;
//       let paymentWalletId;

//       // Translate payment mode to payment method and payment method title
//       if (paymentMode === 1) {
//         paymentMethod = 'cod';
//         paymentMethodTitle = 1;
//         paymentWalletId = 0;
//       } else if (paymentMode === 2) {
//         paymentMethod = 'some_value'; // Define appropriate value for paymentMode === 2
//         paymentMethodTitle = 61;
//         paymentWalletId = 0;
//       } else if ([21, 31, 41, 51].includes(paymentMode)) {
//         paymentMethod = 'some_value'; // Define appropriate value for other payment modes
//         paymentMethodTitle = 71;
//         paymentWalletId = paymentMode;
//       }

//       // Update PaymentDetails model with paymentMethod, paymentWalletId, and paymentMethodTitle
//       await PaymentDetails.update(
//         { payment_method: paymentMethod, payment_wallet_id: paymentWalletId, payment_method_title: paymentMethodTitle },
//         { where: { bolt_order_id: orderId } }
//       );
//     }

//     // Update order status in bolt_order table
//     if (orderStatus) {
//       const futureDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
//       // Update dhc_order_logistic table
//       await OrderLogistic.update(
//         { future_date: futureDate, logistic_remarks: reason },
//         { where: { bolt_order_id: orderId } }
//       );

//       // Update bolt_order table
//       await BoltOrder.update(
//         { updated_datetime: new Date().toISOString().slice(0, 19).replace('T', ' '), status: orderStatus, sub_status: 7 },
//         { where: { bolt_order_id: orderId } }
//       );

//       // Update bolt_dc_order_allocation table
//       await OrderAllocation.update(
//         { order_status: orderStatus, order_status_reason: reason, order_status_date: new Date().toISOString().slice(0, 19).replace('T', ' '), latest_comment: remark, status_changed_by: userId, status_changed_date: new Date().toISOString().slice(0, 19).replace('T', ' ') },
//         { where: { bolt_order_id: orderId } }
//       );

//       // Update bolt_dc_order_status_history table
//       await OrderStatusHistory.create({
//         status_by: userId,
//         status_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
//         comment_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
//         comment: remark,
//         order_status: orderStatus,
//         order_status_reason: reason,
//         bolt_order_id: orderId
//       });

//       // Update dhc_order_logistic table again for logistic_remarks
//       await OrderLogistic.update(
//         { logistic_remarks: reason },
//         { where: { bolt_order_id: orderId } }
//       );
//     }

//     // Respond with success message
//     res.status(200).json({ message: "Data updated successfully" });
//   } catch (error) {
//     console.error("Error updating data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
router.put('/update/:orderId', fetchUser, async (req, res) => {
  try {
    const { paymentMode, orderStatus, remark, reason } = req.body;
    const { orderId } = req.params;
    const userId = req.user.id;

    // Define conditions for update queries
    const updateConditions = { id: orderId }; // Removed userId as it's not used in the update queries

    // Check if orderStatus is provided and not null
    if (orderStatus != null) {
      const futureDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      // Update dhc_order_logistic table
      await OrderLogistic.update(
        { future_date: futureDate, logistic_remarks: reason },
        { where: { bolt_order_id: orderId } }
      );

      // Update bolt_order table
      await BoltOrder.update(
        { updated_datetime: new Date().toISOString().slice(0, 19).replace('T', ' '), status: orderStatus, sub_status: 7 },
        { where: { bolt_order_id: orderId } }
      );

      // Update bolt_dc_order_allocation table
      await OrderAllocation.update(
        { order_status: orderStatus, order_status_reason: reason, order_status_date: new Date().toISOString().slice(0, 19).replace('T', ' '), latest_comment: remark, status_changed_by: userId, status_changed_date: new Date().toISOString().slice(0, 19).replace('T', ' ') },
        { where: { bolt_order_id: orderId } }
      );

      // Create a new record in reasonStatusHistory table only if orderStatus is provided
      await reasonStatusHistory.create({
        bolt_order_id: orderId,
        orderStatus: orderStatus, // Ensure orderStatus is not null
        orderStatusReason: reason,
        statusBy: userId,
        statusDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        comment: remark,
        commentDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });

      // Update dhc_order_logistic table again for logistic_remarks
      await OrderLogistic.update(
        { logistic_remarks: reason },
        { where: { bolt_order_id: orderId } }
      );
    }

    // Respond with success message
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






module.exports = router;
