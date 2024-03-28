const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Transporter = require("../models/Transporter");
const crypto = require("crypto"); // Import the crypto module for MD5 hashing
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "The User is Identified";
const boltOrders = require("../models/boltOrders");

// API For Login the User
router.post(
  "/login",
  [
    body("username", "Enter a valid username").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      // Check if user with this username exists
      let user = await User.findOne({
        where: { username },
        attributes: [
          "id",
          "login_id",
          "username",
          "phone",
          "password",
          "status",
          "dc_user_profile_id",
          "tranporter_id",
          "site_location",
        ],
      });

      if (!user) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const hashedPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      const isPasswordValid = hashedPassword === user.password;

      if (!isPasswordValid) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      if (user.status !== 1 && user.dc_user_profile_id !== 62) {
        return res.status(400).json({ success, error: "User is inactive" });
      }

      // Fetch transporter details using transporter_id from the User model
      const transporter = await Transporter.findByPk(user.tranporter_id, {
        attributes: ["transporter_name"], // Fetch only transporter_name
      });

      // Fetch bolt_order_id from boltOrders table
      const boltOrder = await boltOrders.findOne({
        where: { user_id: user.id }, // Assuming user_id field is associated with the user id
        attributes: ["bolt_order_id"],
      });

      const data = {
        user: {
          id: user.id,
          username: user.username,
          status: user.status,
          profile_id: user.dc_user_profile_id,
          login_id: user.login_id,
          phone: user.phone,
          password: user.password,
          tranporter_id: user.tranporter_id,
          boltOrderId: boltOrder ? boltOrder.bolt_order_id : null,
          transporter_name: transporter ? transporter.transporter_name : null,
          enable_call_flag: user.enable_call_flag,
          profile_id: user.profile_id,
          site_location: user.site_location,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({ success, authToken });
      console.log("User logged in successfully:", user.username);
      console.log("Auth Token:", authToken);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
