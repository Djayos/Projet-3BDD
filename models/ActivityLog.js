const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
