const User = require("../Model/User");
const Product = require("../Model/Product");
const cloudinary = require("cloudinary");
const serverError = require("../utils/serverError");
const productValidation = require("../validations/productValidation");
const SubProduct = require("../Model/SubProduct");

const addProduct = (req, res) => {
  const { category, title, description, price } = req.body;
  const { email } = req.user;

  const validation = productValidation({
    category,
    image: req.file,
    title,
    description,
    price,
  });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (response.role === "admin") {
          cloudinary.v2.uploader.upload(
            req.file.path,
            { public_id: "rent/products/" + req.file.filename },
            function (err, result) {
              console.log();
              if (err) {
                serverError(res);
              } else {
                const products = {
                  category,
                  title,
                  description,
                  price,
                  image: {
                    url: result.url,
                    public_id: result.public_id,
                  },
                };
                new Product(products)
                  .save()
                  .then((response) => {
                    res.status(200).json(response);
                  })
                  .catch(() => {
                    serverError(res);
                  });
              }
            }
          );
        } else {
          res.status(400).json({
            message: "You are not Admin!",
          });
        }
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
  const { category, title, description, price, imageUrl } = req.body;
  const validation = productValidation({
    image: req.file || imageUrl,
    category,
    title,
    description,
    price,
  });
  if (validation.isValid) {
    Product.findOne({ _id: id })
      .then((product) => {
        if (req.file) {
          cloudinary.v2.uploader.destroy(product.image.public_id);
          cloudinary.v2.uploader.upload(
            req.file.path,
            {
              public_id: "rent/products/" + req.file.filename,
            },
            function (err, result) {
              if (err) {
                serverError(res);
              } else if (result) {
                const updateProduct = {
                  category,
                  title,
                  description,
                  price,
                  image: {
                    url: result.url,
                    public_id: result.public_id,
                  },
                };
                Product.findOneAndUpdate({ _id: id }, updateProduct, {
                  new: true,
                })
                  .then((response) => {
                    res.status(200).json(response);
                  })
                  .catch(() => {
                    serverError(res);
                  });
              }
            }
          );
        } else {
          const updateProduct = {
            category,
            title,
            description,
            price,
          };
          Product.findOneAndUpdate({ _id: id }, updateProduct, { new: true })
            .then((response) => {
              res.status(200).json(response);
            })
            .catch(() => {
              serverError(res);
            });
        }
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const getProducts = (req, res) => {
  Product.find().populate('subProducts')
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const { email } = req.user;
  User.findOne({ email })
    .then((userResponse) => {
      if (userResponse.role === "admin") {
        Product.findOneAndRemove({ _id: id })
          .then((proResponse) => {
            SubProduct.deleteMany({ product: id }).exec();
            cloudinary.v2.uploader.destroy(
              proResponse.image.public_id,
              function (err, result) {
                if (err) {
                  serverError(res);
                } else if (result) {
                  res.status(200).json(proResponse);
                }
              }
            );
          })
          .catch(() => {
            serverError(res);
          });
      }
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
};
