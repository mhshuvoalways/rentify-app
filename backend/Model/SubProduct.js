const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    booked: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("subProduct", productSchema);
