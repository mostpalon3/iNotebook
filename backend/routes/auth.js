const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

//route 1
// create a User using : POST "/api/auth/createuser". no login require
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email ").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const {title, description, tag} = req.body;
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //this returns from promise , jaise hee yeh chala jayega to hame user return kr diya jayega
    //check whether the user with this email already exists
    try {
      //handling error if user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "A user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);//generates a salt
      const secPass = await bcrypt.hash(req.body.password, salt);//hashes the password using salt

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, jwtSecret);
      //   await user.save();
      //   res.json(user);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success,"Internal Server Error");
    }
  }
);
//route 2
// AUTHENTICATE a User using : POST "/api/auth/login". no login require
router.post(
  "/login",
  [
    body("email", "Enter a valid email ").isEmail(),
    body("password", "Password cannot be blank ").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, jwtSecret);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//route 3
//Get loggedin User Details using : POST "/api/auth/getuser" Login required'
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password"); //-password here means except the password
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;