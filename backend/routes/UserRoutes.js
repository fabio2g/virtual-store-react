const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/UserController");

/**
 * Rotas de registro
 */
router.get("/register", register);

/**
 * Rotas de login
 */
router.get("/login", login);

module.exports = router;
