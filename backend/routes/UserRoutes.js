const express = require("express");
const router = express.Router();

const { login } = require("../controllers/UserController");

/**
 * Rotas de login do usuário
 */
router.get("/login", login);

module.exports = router;
