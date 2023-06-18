const User = require("../Model/User");
const Category = require("../Model/Category");
const cloudinary = require("cloudinary");
const serverError = require("../utils/serverError");
const categoryValidation = require("../validations/categoryValidation");

const addCategory = (req, res) => {
  const { name } = req.body;
  const { email } = req.user;

  const validation = categoryValidation({
    image: req.file,
    name,
  });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (response.role === "admin") {
          cloudinary.v2.uploader.upload(
            req.file.path,
            { public_id: "rent/categories/" + req.file.filename },
            function (err, result) {
              if (err) {
                serverError(res);
              } else {
                const category = {
                  name,
                  image: {
                    url: result.url,
                    public_id: result.public_id,
                  },
                };
                new Category(category)
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

const editCategory = (req, res) => {
  const id = req.params.id;
  const { name, imageUrl } = req.body;
  const validation = categoryValidation({
    image: req.file || imageUrl,
    name,
  });
  if (validation.isValid) {
    Category.findOne({ _id: id })
      .then((product) => {
        if (req.file) {
          cloudinary.v2.uploader.destroy(product.image.public_id);
          cloudinary.v2.uploader.upload(
            req.file.path,
            {
              public_id: "rent/categories/" + req.file.filename,
            },
            function (err, result) {
              if (err) {
                serverError(res);
              } else if (result) {
                const updateCategory = {
                  name,
                  image: {
                    url: result.url,
                    public_id: result.public_id,
                  },
                };
                Category.findOneAndUpdate({ _id: id }, updateCategory, {
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
          const updateCategory = {
            name,
          };
          Category.findOneAndUpdate({ _id: id }, updateCategory, { new: true })
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

const getCategories = (req, res) => {
  Category.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteCategory = (req, res) => {
  const id = req.params.id;
  const { email } = req.user;
  User.findOne({ email })
    .then((userResponse) => {
      if (userResponse.role === "admin") {
        Category.findOneAndRemove({ _id: id })
          .then((proResponse) => {
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
  addCategory,
  editCategory,
  getCategories,
  deleteCategory,
};
