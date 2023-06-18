const Order = require("../Model/Order");
const Booked = require("../Model/Booked");
const serverError = require("../utils/serverError");
const orderValidation = require("../validations/orderValidation");

const addOrder = (req, res) => {
  const { shippingAddress, totalPrice, products } = req.body;
  const validation = orderValidation(shippingAddress);
  if (validation.isValid) {
    const orderObj = {
      user: req.user._id,
      shippingAddress,
      products,
      totalPrice,
    };
    new Order(orderObj)
      .save()
      .then((response) => {
        res.status(200).json(response);
        Booked.deleteMany({ user: req.user._id }).exec();
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getOrders = (req, res) => {
  Order.find()
    .populate("user")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getMyOrders = (req, res) => {
  const id = req.user._id;
  Order.find({ user: id })
    .populate("user")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addOrder,
  getOrders,
  getMyOrders,
};
