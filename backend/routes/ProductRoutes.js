const express = require("express");
const router = express.Router();

const {
    register,
    updateProduct,
    getAllProduct,
    getProductById,
} = require("../controllers/ProductController");

const {
    productValidation,
    updateProductValidation,
    getProductValidation,
} = require("../middlewares/productValidation");

const validate = require("../middlewares/handleValidation");

router.post("/register", productValidation(), validate, register);

router.get("/read_all", getAllProduct);

router.get("/read_id/:id", getProductById);

router.put(
    "/update",
    productValidation(),
    updateProductValidation(),
    validate,
    updateProduct
);

module.exports = router;
