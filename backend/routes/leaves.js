const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

// CRUD routes
router.post("/", leaveController.createLeave);
router.get("/", leaveController.getLeaves);
router.get("/:id", leaveController.getLeaveById);
router.put("/:id", leaveController.updateLeave);
router.delete("/:id", leaveController.deleteLeave);
router.get("/summary/:user_id", leaveController.getEmployeeLeaveSummary);

module.exports = router;
