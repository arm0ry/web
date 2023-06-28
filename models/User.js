const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
      default: "",
      unique: true,
    },
    lastRequestAt: { type: Date, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
