const router = require("express").Router();
const {
  addOrder,
  getOrders,
  getMyOrders,
} = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");

router.get("/getorders", getOrders);
router.get("/getmyorders", authenticate, getMyOrders);
router.post("/addorder", authenticate, addOrder);

module.exports = router;
