const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrders,
  getMyOrders,
  updateOrders,
  deleteOrder,
  orderInCase,
} = require("../controllers/orderController");
const authenticate = require("../middlewares/authenticate");

router.use(express.json());

router.get("/getorders", getOrders);
router.get("/getmyorders", authenticate, getMyOrders);
router.post("/addorder", authenticate, addOrder);
router.put("/orderupdate/:id", authenticate, updateOrders);
router.delete("/deleteorder/:id", authenticate, deleteOrder);
router.post("/orderincash", authenticate, orderInCase);

module.exports = router;
