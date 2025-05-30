// controllers/authController.js
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { find, push } from "../config/database";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function signup(req, res) {
  const { username, email, password, role } = req.body;

  // check if user exists
  const existingUser = find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }
   
  // hash password
  const hashedPassword = await hash(password, 10);

  // create user and save
  const newUser = new User(username, email, hashedPassword, role);
  push(newUser);

  res.status(201).json({ message: "Signup successful" });
}

export async function login(req, res) {
  const { username, password, role } = req.body;

  // find user by username and role
  const user = find(u => u.username === username && u.role === role);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // compare password
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // generate token
  const token = sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login successful", token });
}
