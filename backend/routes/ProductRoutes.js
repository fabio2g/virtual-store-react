const express = require("express");
const router = express.Router();

const {
    register,
    updateProduct,
    getAllProduct,
} = require("../controllers/ProductController");

const {
    productValidation,
    updateProductValidation,
} = require("../middlewares/productValidation");

const validate = require("../middlewares/handleValidation");

router.post("/register", productValidation(), validate, register);

router.get("/readall", getAllProduct);

router.put(
    "/update",
    productValidation(),
    updateProductValidation(),
    validate,
    updateProduct
);

module.exports = router;
