const express = require("express");
const router = express.Router();

const validate = require("../middlewares/handleValidation");

const authGuard = require("../middlewares/authGuard");
const {
    signUpInputValidation,
    signInInputvalidation,
} = require("../middlewares/userValidation");
const cartInputValidation = require("../middlewares/cartValidation");

const {
    signUp,
    signIn,
    deleteAccount,
    profile,
    addToCart,
} = require("../controllers/UserController");

/**
 * Rotas de registro
 */
router.post("/signup", signUpInputValidation, signUp);

/**
 * Rotas de login
 */
router.post("/signin", signInInputvalidation, signIn);

/**
 * Rotas responsável por deletar a conta
 */
router.patch("/deleteaccount/:id", deleteAccount);

/**
 * Rotas de perfil do usuário logado
 */
router.get("/profile", authGuard, profile);

/**
 * Rotas de carrinho de compra do usuário
 */
router.post("/shoppingcart", authGuard, cartInputValidation, addToCart);

module.exports = router;
