const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const { adminRegister } = require("../controllers/userController");

module.exports = (app) => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      app.listen(port, () => {
        console.log(`App listening at : ${port}`);
      });
      adminRegister({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123",
      });
    })
    .catch(() => {
      console.log("Server error occurred");
    });
};
