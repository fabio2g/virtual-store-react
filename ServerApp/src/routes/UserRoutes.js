const express = require("express");
const router = express.Router();

const {
    userCreateValidation,
    loginValidation,
} = require("../middlewares/userValidation");

const {
    signUp,
    signIn,
    deleteAccount,
    profile,
    addToCart,
} = require("../controllers/UserController");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const cartInputValidation = require("../middlewares/cartValidation");
const errorValidation = require("../middlewares/errorValidation");

/**
 * Rotas de registro
 */
router.post("/signup", userCreateValidation(), validate, signUp);

/**
 * Rotas de login
 */
router.post("/signin", loginValidation(), validate, signIn);

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
