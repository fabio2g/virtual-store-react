const express = require("express");
const addAddress = require("../controllers/AddressController");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const { validate } = require("../models/Address");

router.post("/address", authGuard, addAddress);

module.exports = router;
