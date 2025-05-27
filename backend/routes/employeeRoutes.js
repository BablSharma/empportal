const express = require("express");
const router = express.Router();
const pool = require("../db"); // adjust path as needed

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Server error while fetching employees" });
  }
});

module.exports = router;
