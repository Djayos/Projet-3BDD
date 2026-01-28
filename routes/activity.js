const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

// GET all logs
router.get("/", async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create log
router.post("/", async (req, res) => {
  try {
    const { userId, action } = req.body;
    const log = await ActivityLog.create({ userId, action });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
