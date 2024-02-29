const express = require('express');
const Inventory = require('../models/inventory');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
// Example data (replace with your database operations)



router.get("/getinvetory", fetchUser, async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ where: { user: req.user.id } });
    res.json(inventory);
    // console.log(inventory)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addinventory", fetchUser, async (req, res) => {
  try {
    // Create a new order associated with the authenticated user

    const {
      SKU_Code,
      Cust_Name,
      Brand,
      Issued_Qty,
      Delivered,
      Damage_Lost,
      Balance_Qty   
    } = req.body;

    const newInventory = await Inventory.create({
      user: req.user.id, // Assuming req.user contains the authenticated user's information
      SKU_Code,
      Cust_Name,
      Brand,
      Issued_Qty,
      Delivered,
      Damage_Lost,
      Balance_Qty
  
    });

    res.status(201).json(newInventory);

    // Return the newly created order
    // res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
