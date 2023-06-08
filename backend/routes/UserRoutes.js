const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/UserController");
const { userCreateValidation } = require("../middlewares/userValidation")
const validate = require("../middlewares/handleValidation");

/**
 * Rotas de registro
 */
router.post("/register", userCreateValidation(), validate, register);

/**
 * Rotas de login
 */
router.get("/login", validate, login);

module.exports = router;
