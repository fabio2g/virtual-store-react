const express = require("express");
const router = express.Router();

const {
    userCreateValidation,
    loginValidation,
} = require("../middlewares/userValidation");

const {
    signUp,
    signIn,
    profile,
    addProductToCart,
} = require("../controllers/UserController");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

/**
 * Rotas de registro
 */
router.post("/signup", userCreateValidation(), validate, signUp);

/**
 * Rotas de login
 */
router.post("/signin", loginValidation(), validate, signIn);

/**
 * Rotas de perfil do usuário logado
 */
router.get("/profile", authGuard, profile);

router.post("/cart", authGuard, validate, addProductToCart);

module.exports = router;
