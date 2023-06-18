const router = require("express").Router();
const {
  addCategory,
  editCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");
const fileUploader = require("../middlewares/fileUploader");

router.post(
  "/addcate",
  authenticate,
  fileUploader.single("image"),
  addCategory
);
router.put(
  "/editcate/:id",
  authenticate,
  fileUploader.single("image"),
  editCategory
);
router.get("/getcates", getCategories);
router.delete("/deletecate/:id", authenticate, deleteCategory);

module.exports = router;
