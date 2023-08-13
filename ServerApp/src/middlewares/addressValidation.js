const { body } = require("express-validator");

const addressValidation = () => {
    return [
        body("street")
            .isString()
            .withMessage("A rua é obrigatória.")
            .isLength({ min: 5 })
            .withMessage('O campo "rua" deve ter no mínimo cinco caracteres'),
        body("number")
            .isNumeric()
            .withMessage("Um número de casa/apartamento é obrigatório."),
        body("city")
            .isString()
            .notEmpty()
            .withMessage('O campo "cidade" é obrigatório."')
            .trim(),
        body("state")
            .isString()
            .notEmpty()
            .withMessage('O campo "Estado" é obrigatório'),
        body("country")
            .isString()
            .notEmpty()
            .withMessage('O campo "Pais" é obrigatório.'),
        body("cep")
            .isString()
            .notEmpty()
            .withMessage('O campo "CEP" é obrigatório.'),
    ];
};

module.exports = {
    addressValidation,
};
