const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Transporter = require("../models/Transporter"); 
const crypto = require("crypto"); // Import the crypto module for MD5 hashing
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const JWT_SECRET = "The User is Identified";


router.post(
  "/signup",
  [
    body("username", "Please enter a valid name").isLength({ min: 3 }),
    body("password", "Password cannot be blank").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({
        where: { username: req.body.username, password: req.body.password },
      });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry, a user with this username already exists",
        });
      }

      // MD5 hashing the password
      const secPass = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex");
      user = await User.create({
        username: req.body.username,
        password: secPass,
        // status: 1,
      });
      const data = {
        user: {
          id: user.id,
          name: user.username,
          password: user.password,
          // status: user.status,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("data", data);
      console.log("AuthToken", authToken);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
);

//API For Login the User



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
          // Remove transporter_name attribute as we'll fetch it separately
          "enable_call_flag",
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

      const data = {
        user: {
          id: user.id,
          username: user.username,
          status: user.status,
          profile_id: user.dc_user_profile_id,
          login_id: user.login_id,
          phone: user.phone,
          password: user.password,
          // Remove transporter_name from here
          tranporter_id: user.tranporter_id,
          // Add transporter_name from the fetched transporter details
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
