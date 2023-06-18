const Product = require("../Model/Product");
const SubProduct = require("../Model/SubProduct");
const serverError = require("../utils/serverError");
const productValidation = require("../validations/subProValidation");

const addProduct = (req, res) => {
  const { title, type, availability, productId } = req.body;
  const validation = productValidation({
    title,
    type,
    availability,
  });
  if (validation.isValid) {
    const products = {
      product: productId,
      title,
      type,
      availability,
    };
    new SubProduct(products)
      .save()
      .then((response) => {
        Product.findOne({ _id: productId })
          .then((product) => {
            product.subProducts.push(response._id);
            Product.findOneAndUpdate(
              { _id: productId },
              { subProducts: product.subProducts },
              {
                new: true,
              }
            ).exec();
          })
          .catch(() => {
            serverError(res);
          });
        res.status(200).json(response);
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const editProduct = (req, res) => {
  const id = req.params.id;
  const { title, type, availability } = req.body;
  const validation = productValidation({
    title,
    type,
    availability,
  });
  if (validation.isValid) {
    const updateProduct = {
      title,
      type,
      availability,
    };
    SubProduct.findOneAndUpdate({ _id: id }, updateProduct, { new: true })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getProducts = (req, res) => {
  const id = req.params.id;
  SubProduct.find({ product: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getallProducts = (req, res) => {
  SubProduct.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  SubProduct.findOneAndRemove({ _id: id })
    .then((proResponse) => {
      res.status(200).json(proResponse);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addProduct,
  editProduct,
  getProducts,
  getallProducts,
  deleteProduct,
};
