// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON bodies

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
