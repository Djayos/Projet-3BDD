const express = require("express");
const router = express.Router();
const redisClient = require("../db/redis");

// incr visits
router.get("/visits", async (req, res) => {
  try {
    const visits = await redisClient.incr("visits");
    res.json({ visits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// read visits without increment
router.get("/visits/value", async (req, res) => {
  try {
    const value = await redisClient.get("visits");
    res.json({ visits: Number(value || 0) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
