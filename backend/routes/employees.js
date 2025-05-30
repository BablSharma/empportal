const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bablu@123",
  database: "hr_employee_db",
});

// GET all employees
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Server error while fetching employees" });
  }
});

// POST create new employee
router.post("/", async (req, res) => {
  const { id, name, doj, status } = req.body;

  if (!id || !name || !doj || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO employees (id, name, doj, status) VALUES (?, ?, ?, ?)",
      [id, name, doj, status]
    );

    res.status(201).json({
      message: "Employee created successfully",
      employeeId: result.insertId,
    });
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
});
router.get("/inactive", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees WHERE status = 'inactive'");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching inactive employees:", err);
    res.status(500).json({ error: "Server error while fetching inactive employees" });
  }
});
// PATCH - update status (active/inactive)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status field is required" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE employees SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee status updated successfully" });
  } catch (err) {
    console.error("Error updating employee status:", err);
    res.status(500).json({ error: "Server error while updating status" });
  }
});


module.exports = router;
