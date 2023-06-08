const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter mais de 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A senha deve ter no mínimo 5 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas precisam ser iguais.");
                }
                return true;
            }),
    ];
};

const userLoginValidation = () => {};

module.exports = {
    userCreateValidation,
};
