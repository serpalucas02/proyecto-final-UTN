const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  roles: [String],
});

module.exports = mongoose.model("User", userSchema);
