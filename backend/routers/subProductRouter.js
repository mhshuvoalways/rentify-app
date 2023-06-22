const express = require("express");
const router = express.Router();
const {
  addProduct,
  editProduct,
  getallProducts,
  getProducts,
  deleteProduct,
} = require("../controllers/subProductController");
const authenticate = require("../middlewares/authenticate");

router.use(express.json());

router.post("/addproduct", authenticate, addProduct);
router.put("/editproduct/:id", authenticate, editProduct);
router.get("/getproducts/:id", getProducts);
router.get("/getallproducts", getallProducts);
router.delete("/deleteproduct/:id", authenticate, deleteProduct);

module.exports = router;
