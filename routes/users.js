const express = require("express");
const router = express.Router();
const pool = require("../db/postgres");

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name, created_at FROM users ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const result = await pool.query(
      "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name, created_at",
      [email, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
