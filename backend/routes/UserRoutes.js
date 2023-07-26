const express = require("express");
const router = express.Router();

const {
    userCreateValidation,
    loginValidation,
} = require("../middlewares/userValidation");

const {
    register,
    login,
    profile,
    addProductToCart,
} = require("../controllers/UserController");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

/**
 * Rotas de registro
 */
router.post("/register", userCreateValidation(), validate, register);

/**
 * Rotas de login
 */
router.post("/login", loginValidation(), validate, login);

/**
 * Rotas de perfil do usuário logado
 */
router.get("/profile", authGuard, profile);

router.post("/cart", authGuard, validate, addProductToCart);

module.exports = router;
