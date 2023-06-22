const express = require("express");
const router = express.Router();
const {
  userRegister,
  login,
  adminLogin,
  getMyAccount,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

router.use(express.json());

router.post("/register", userRegister);
router.post("/adminlogin", adminLogin);
router.post("/login", login);
router.get("/getmyaccount", authenticate, getMyAccount);
router.get("/getusers", authenticate, getUser);
router.delete("/deleteuser/:id", authenticate, deleteUser);

module.exports = router;
