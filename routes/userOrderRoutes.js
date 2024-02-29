const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Orders = require("../models/orders");
const User = require("../models/user");
const { Op } = require("sequelize");

//Router 1: for getting all the orders of the specific logged in user GET Request
router.get("/getorders", fetchUser, async (req, res) => {
  try {
    const order = await Orders.findAll({ where: { user: req.user.id } });
    res.json(order);
    console.log();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Router 2: for making orders for specific logged in user
router.post("/users/orders", fetchUser, async (req, res) => {
  try {
    // Create a new order associated with the authenticated user

    const {
      Cust_Name,
      COD_Amt,
      Status,
      address,
      mobile_num,
      product_name,
      qty,
      alt_mobile_num,
      payment_mode,
      remark,
      reason,
    } = req.body;

    const newOrder = await Orders.create({
      user: req.user.id, // Assuming req.user contains the authenticated user's information
      Cust_Name,
      address,
      mobile_num,
      product_name,
      qty,
      alt_mobile_num,
      payment_mode,
      remark,
      reason,
      COD_Amt,
      Status,
    });

    // Return the newly created order
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Router 3:  to get orders for the logged-in user
router.get("/users/orders", fetchUser, async (req, res) => {
  try {
    // Fetch orders associated with the logged-in user
    const userOrders = await Orders.findAll({
      where: { user: req.user.id },
    });

    res.json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateorders/:id", fetchUser, async (req, res) => {
  const {
    Cust_Name,
    address,
    mobile_num,
    product_name,
    qty,
    alt_mobile_num,
    payment_mode,
    remark,
    reason,
    COD_Amt,
    Status,
  } = req.body;

  try {
    // Find the order by its primary key (Order_Id)
    let order = await Orders.findByPk(req.params.id);

    // Check if the order exists
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Check if the authenticated user is authorized to update the order
    if (order.user !== req.user.id) {
      return res.status(401).send("Unauthorized access");
    }

    // Update the order fields with the new data
    if (Cust_Name) {
      order.Cust_Name = Cust_Name;
    }
    if (address) {
      order.address = address;
    }
    if (mobile_num) {
      order.mobile_num = mobile_num;
    }
    if (product_name) {
      order.product_name = product_name;
    }
    if (qty) {
      order.qty = qty;
    }
    if (alt_mobile_num) {
      order.alt_mobile_num = alt_mobile_num;
    }
    if (payment_mode) {
      order.payment_mode = payment_mode;
    }
    if (remark) {
      order.remark = remark;
    }
    if (reason) {
      order.reason = reason;
    }
    if (COD_Amt) {
      order.COD_Amt = COD_Amt;
    }
    if (Status) {
      order.Status = Status;
    }

    // Save the updated order to the database
    await order.save();

    // Respond with the updated order
    res.json({ order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
