const express = require("express");
const router = express.Router();

const { register } = require("../controllers/ProductController");

const {
    registerProductValidation,
} = require("../middlewares/productValidation");

const validate = require("../middlewares/handleValidation");

router.post("/register", registerProductValidation(), validate, register);

module.exports = router;
