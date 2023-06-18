const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
