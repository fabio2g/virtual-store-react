const express = require("express");
const updateAddress = require("../controllers/AddressController");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const { validate } = require("../models/Address");

router.post("/address", authGuard, updateAddress);

module.exports = router;
