const router = require("express").Router();
const {
  addBook,
  updateBook,
  getMyBook,
  deleteMyBook,
} = require("../controllers/bookedController");
const authenticate = require("../middlewares/authenticate");

router.get("/getmybooks", authenticate, getMyBook);
router.post("/addbook", authenticate, addBook);
router.put("/updatebook/:id", authenticate, updateBook);
router.delete("/deletebook/:id", authenticate, deleteMyBook);

module.exports = router;
