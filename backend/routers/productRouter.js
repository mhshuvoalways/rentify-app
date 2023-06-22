const express = require("express");
const router = express.Router();
const {
  addProduct,
  editProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");
const fileUploader = require("../middlewares/fileUploader");

router.use(express.json());

router.post(
  "/addproduct",
  authenticate,
  fileUploader.single("image"),
  addProduct
);
router.put(
  "/editproduct/:id",
  authenticate,
  fileUploader.single("image"),
  editProduct
);
router.get("/getproducts", getProducts);
router.delete("/deleteproduct/:id", authenticate, deleteProduct);

module.exports = router;
