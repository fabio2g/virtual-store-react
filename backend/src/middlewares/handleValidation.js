const { validationResult } = require("express-validator");

const validate = (err, req, res, next) => {
    if (err) {
        return res.status(500).json({ status: false, error: err });
    }

    next();

    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //     return next();
    // }
    // const extractedErros = [];
    // errors.array().map((err) => extractedErros.push(err.msg));
    // return res.status(422).json({ success: false, error: extractedErros });
};

module.exports = validate;
