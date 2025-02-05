import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      { isLogged: false },
      process.env.JWT_SECRET, // Use this key for development
      { expiresIn: "1h" }
    );
    //save new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verificationToken: token,
    });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "user doesnt exist" });
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!password) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, isLogged: true },
      process.env.JWT_SECRET, // Use this key for development
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "Login successfull", token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
