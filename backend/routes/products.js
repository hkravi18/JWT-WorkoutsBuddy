const express = require('express');
const router = express.Router();

const {
    getProduct,
    getUserProducts,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../Controllers/productController');

const requireAuth = require('../middleware/requireAuth');

//GET all products 
router.get("/", getProducts);

//auth middleware 
router.use(requireAuth);

//GET all user's products 
router.get("/myproducts", getUserProducts);

// //GET a single product
router.get("/:id", getProduct);

//POST all products 
router.post("/", createProduct);

//DELETE a single product
router.delete("/:id", deleteProduct);

//UPDATE a single product
router.patch("/:id", updateProduct);

module.exports = router;