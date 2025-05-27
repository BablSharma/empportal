const Leave = require("../models/Leave");

exports.createLeave = async (req, res) => {
  try {
    const { user_id, start_date, end_date, reason } = req.body;

    if (!user_id || !start_date || !end_date || !reason) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (new Date(end_date) < new Date(start_date)) {
      return res.status(400).json({ error: "End date cannot be before start date." });
    }

    const newLeave = await Leave.create({
      user_id,
      start_date,
      end_date,
      reason,
      status: "pending",
    });

    res.status(201).json(newLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });

    const { start_date, end_date, reason, status } = req.body;

    if (start_date) leave.start_date = start_date;
    if (end_date) leave.end_date = end_date;
    if (reason) leave.reason = reason;
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      leave.status = status;
    }

    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ error: "Leave not found" });

    await leave.destroy();
    res.json({ message: "Leave deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
