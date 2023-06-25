const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
      default: "",
    },
    lastRequestAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);

mongoose.model("User", UserSchema);
