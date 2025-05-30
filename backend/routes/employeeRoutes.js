import { Router } from "express";
const router = Router();
import { query } from "../db"; // adjust path as needed

// GET all employees
router.get("/", async (req, res) => {
  try {
    const [rows] = await query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Server error while fetching employees" });
  }
});

// PATCH - update status (active/inactive)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Logging for debugging
  console.log("PATCH request for ID:", id, "with status:", status);

  try {
    const [result] = await query(
      "UPDATE employees SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      console.log("No employee found with ID:", id);
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee status updated successfully" });
  } catch (err) {
    console.error("Error updating employee status:", err);
    res.status(500).json({ error: "Server error while updating status" });
  }
});
