const { body } = require("express-validator");
const { isString } = require("util");
const validUrl = require("valid-url");

const registerProductValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório!")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter mais de 3 caracteres!"),
        body("serie")
            .isString()
            .withMessage("O código de referência é obrigatório!")
            .isLength({ min: 3 })
            .withMessage("O código deve ter no mínimo 3 caracteres!"),
        body("brand")
            .isString()
            .withMessage("A marca é obrigatória!")
            .isLength({ min: 3 })
            .withMessage("A marca deve ter no mínimo 3 caracteres!"),
        body("color")
            .isString()
            .withMessage("A cor é obrigatória!")
            .custom((color) => {
                const arr = ["RED", "BLACK"];

                if (!arr.includes(color.toUpperCase()))
                    throw new Error("Cor ínvalida!");
            }),
        body("description")
            .isString()
            .withMessage("A descrição é obrigatória!")
            .isLength({ min: 10 })
            .withMessage("A descrição deve ter no mínimo 10 caracteres!"),
        body("price")
            .isNumeric()
            .withMessage("O preço deve ser um número!")
            .custom((value) => {
                if (value <= 0) {
                    throw new Error("O valor deve ser maior que zero!");
                }
                return true;
            }),
        body("stockQuantity")
            .isNumeric()
            .withMessage("A quantidade de estoque deve ser um número!")
            .custom((value) => {
                if (value <= 0)
                    throw new Error(
                        "A quantidade de estoque deve ser maior que 0!"
                    );
                return true;
            }),
        body("images")
            .isArray({ min: 1 })
            .withMessage("A imagem é obrigatória!")
            .custom((images) => {
                for (let image of images) {
                    if (typeof image !== "string")
                        throw new Error("Cada imagem deve ser uma string!");

                    if (!validUrl.isWebUri(image))
                        throw new Error(`A url ${image} é inválido!`);
                }
                return true;
            }),
    ];
};

module.exports = {
    registerProductValidation,
};
