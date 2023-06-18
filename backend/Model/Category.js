const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("category", categorySchema);
