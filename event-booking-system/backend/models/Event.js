const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  description: String,
  attendees: Number,
});

module.exports = mongoose.model("Event", EventSchema);
