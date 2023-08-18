const { validationResult } = require("express-validator");

const validate = (err, req, res, next) => {
    if (err) {
        return res.status(500).json({ status: false, error: err });
    }
    next();
};

module.exports = validate;
