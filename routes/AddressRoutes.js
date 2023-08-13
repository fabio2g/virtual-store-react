const express = require("express");
const updateAddress = require("../controllers/AddressController");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { addressValidation } = require("../middlewares/addressValidation");

router.post(
    "/address",
    authGuard,
    addressValidation(),
    validate,
    updateAddress
);

module.exports = router;
