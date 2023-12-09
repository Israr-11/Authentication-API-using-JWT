const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  firstName: { type: String, required: true, default: null },
  lastName: { type: String, required: true, default: null },
  email: { type: String, required: true, default: null },
  password: { type: String, required: true },
  token: { type: String },
});

const authSchema = mongoose.model("jwts", newSchema);
module.exports = authSchema;
