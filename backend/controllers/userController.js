const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const serverError = require("../utils/serverError");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");

const adminRegister = ({ name, email, password }) => {
  User.findOne({ email }).then((response) => {
    if (!response) {
      bcrypt.hash(password, 10, function (err, hash) {
        if (hash) {
          const user = {
            name,
            email,
            password: hash,
            role: "admin",
          };
          new User(user).save();
        }
      });
    }
  });
};

const userRegister = (req, res) => {
  const { name, email, password, recaptch, agree } = req.body;
  const validation = registerValidation({
    name,
    email,
    password,
    recaptch,
    agree,
  });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (!response) {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              serverError(res);
            } else {
              const user = {
                name,
                email,
                password: hash,
              };
              new User(user)
                .save()
                .then((response) => {
                  const token = jwt.sign(
                    {
                      _id: response._id,
                      email: response.email,
                    },
                    process.env.SECRET,
                    { expiresIn: "3650d" }
                  );
                  res.status(200).json({
                    message: "Thanks for register!",
                    response,
                    token,
                  });
                })
                .catch(() => {
                  serverError(res);
                });
            }
          });
        } else {
          res.status(400).json({
            message: "User already exists!",
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

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  const validation = loginValidation({ email, password });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (response && response.role === "admin") {
          if (response.isActive) {
            bcrypt.compare(password, response.password, function (err, result) {
              if (result) {
                const token = jwt.sign(
                  {
                    _id: response._id,
                    email: response.email,
                  },
                  process.env.SECRET,
                  { expiresIn: "3650d" }
                );
                res.status(200).json({
                  message: "Welcome back!",
                  token,
                });
              } else {
                res.status(400).json({
                  message: "Password doesn't match!",
                });
              }
              if (err) {
                serverError(res);
              }
            });
          } else {
            res.status(400).json({
              message:
                "Please check your registered mail and activate your account!",
            });
          }
        } else {
          res.status(400).json({
            message: "Admin user not found!",
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

const login = (req, res) => {
  const { email, password } = req.body;
  const validation = loginValidation({ email, password });
  if (validation.isValid) {
    User.findOne({ email })
      .then((response) => {
        if (response) {
          if (response.isActive) {
            bcrypt.compare(password, response.password, function (err, result) {
              if (result) {
                const token = jwt.sign(
                  {
                    _id: response._id,
                    email: response.email,
                  },
                  process.env.SECRET,
                  { expiresIn: "3650d" }
                );
                res.status(200).json({
                  message: "Welcome back!",
                  token,
                });
              } else {
                res.status(400).json({
                  message: "Password doesn't match!",
                });
              }
              if (err) {
                serverError(res);
              }
            });
          } else {
            res.status(400).json({
              message:
                "Please check your registered mail and activate your account!",
            });
          }
        } else {
          res.status(400).json({
            message: "User not found!",
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

const getUser = (req, res) => {
  User.find()
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getMyAccount = (req, res) => {
  const { email } = req.user;
  User.findOne({ email: email })
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  User.findOneAndRemove({ _id: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  adminRegister,
  userRegister,
  adminLogin,
  login,
  getUser,
  getMyAccount,
  deleteUser,
};
