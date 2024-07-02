const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date().getTime() },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
