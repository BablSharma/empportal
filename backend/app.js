const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express(); // Create the app instance first!

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
