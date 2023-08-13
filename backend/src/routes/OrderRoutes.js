const express = require("express");
const router = express.Router();

const createOrder = require("../controllers/OrderController");
const authGuard = require("../middlewares/authGuard");

router.post("/order", authGuard, createOrder);

module.exports = router;
