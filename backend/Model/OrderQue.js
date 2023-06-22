const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    userId: String,
    shippingAddress: {
      name: String,
      email: String,
      villa: Number,
      phone: Number,
      additionalInformation: String,
    },
    products: [
      {
        _id: String,
        title: String,
        quantity: Number,
        price: Number,
        dates: [{ type: String }],
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("orderq", orderSchema);
