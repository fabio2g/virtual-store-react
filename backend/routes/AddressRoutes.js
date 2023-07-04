const express = require("express");
const addAddress = require("../controllers/Address");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");

router.get("/address", authGuard, addAddress);

module.exports = router;
