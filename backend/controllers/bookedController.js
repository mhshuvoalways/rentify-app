const Booked = require("../Model/Booked");
const serverError = require("../utils/serverError");
const bookValidation = require("../validations/bookValidation");

const addBook = (req, res) => {
  const { productId, price, quantity, maxIncrement, dates } = req.body;
  const validation = bookValidation({
    price,
    quantity,
    dates,
  });
  if (validation.isValid) {
    const orderObj = {
      user: req.user._id,
      product: productId,
      price,
      quantity,
      maxIncrement,
      dates,
    };
    new Booked(orderObj)
      .save()
      .then((response) => {
        Booked.findOne({ _id: response._id })
          .populate("product")
          .then((finalRes) => {
            res.status(200).json(finalRes);
          })
          .catch(() => {
            serverError(res);
          });
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const updateBook = (req, res) => {
  const { price, quantity } = req.body;
  const id = req.params.id;
  const orderObj = {
    price,
    quantity,
  };
  Booked.findOneAndUpdate({ _id: id }, orderObj, { new: true })
    .populate("product")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getMyBook = (req, res) => {
  const id = req.user._id;
  Booked.find({ user: id })
    .populate("user")
    .populate("product")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteMyBook = (req, res) => {
  const id = req.params.id;
  Booked.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addBook,
  updateBook,
  getMyBook,
  deleteMyBook,
};
