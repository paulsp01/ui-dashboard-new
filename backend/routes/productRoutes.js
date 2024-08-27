const express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();
//const  isAuthenticated  = require("../middileware/authMiddleware");
const cookieMiddleware=require("../middileware/cookieMiddleware");

router.post("/add", cookieMiddleware, addProduct);


router.delete("/:id", deleteProduct);

// Update a product
router.put("/:id", updateProduct);

router.get("/", getAllProducts);

// Route to get a product by ID
router.get("/:id", getProductById);



module.exports = router;
