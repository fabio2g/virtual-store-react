const express = require("express");
const router = express.Router();

const {
    userCreateValidation,
    loginValidation,
} = require("../middlewares/userValidation");

const { register, login } = require("../controllers/UserController");
const validate = require("../middlewares/handleValidation");


/**
 * Rotas de registro
 */
router.post("/register", userCreateValidation(), validate, register);

/**
 * Rotas de login
 */
router.post("/login", loginValidation(), validate, login);

module.exports = router;
