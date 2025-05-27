// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../config/database");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // check if user exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user and save
  const newUser = new User(username, email, hashedPassword, role);
  users.push(newUser);

  res.status(201).json({ message: "Signup successful" });
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  // find user by username and role
  const user = users.find(u => u.username === username && u.role === role);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // generate token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login successful", token });
};
