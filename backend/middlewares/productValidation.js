const { body } = require("express-validator");
const { isString } = require("util");
const validUrl = require("valid-url");

const registerProductValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório!")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter mais de 3 caracteres."),
        body("serie")
            .isString()
            .withMessage("O código de referência é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O código deve ter no mínimo 3 caracteres."),
        body("color")
            .isString()
            .withMessage("Por favor, informe uma cor.")
            .custom((color) => {
                const enumColors = [
                    "VERMELHO",
                    "AZUL",
                    "VERDE",
                    "PRETO",
                    "BRANCO",
                    "AMARELO",
                    "ROXO",
                    "LARANJA",
                    "MARROM",
                    "CINZA",
                    "PRATA",
                    "DOURADO",
                    "ROSA",
                ];

                if (!enumColors.includes(color.toUpperCase()))
                    throw new Error("Por favor, informe uma cor válida.");

                return true;
            }),
        body("description")
            .isString()
            .withMessage("Por favor, informe um descrição válida.")
            .isLength({ min: 10 })
            .withMessage("A descrição deve conter no mínimo 10 caracteres."),
        body("categories")
            .isString()
            .withMessage("Por favor, informe uma categoria.")
            .custom((value) => {
                const enumCategories = [
                    "ELETRÔNICOS",
                    "ROUPAS",
                    "ALIMENTOS",
                    "DECORAÇÃO",
                    "ESPORTES",
                    "BELEZA",
                    "AUTOMOTIVO",
                    "BRINQUEDOS",
                    "MÓVEIS",
                    "JOGOS",
                    "SAÚDE",
                    "LIVROS",
                    "PAPÉIS",
                    "INSTRUMENTOS",
                    "PET",
                    "OUTROS",
                ];

                if (typeof value === "string") {
                    if (!enumCategories.includes(value.toUpperCase()))
                        throw new Error(
                            "Por favor, informe uma categoria válida."
                        );
                }

                return true;
            }),
        body("price")
            .isNumeric()
            .withMessage("O preço deve ser um número.")
            .custom((value) => {
                if (value < 0)
                    throw new Error("O valor deve ser maior ou igual a zero.");

                return true;
            }),
        body("stockQuantity")
            .isNumeric()
            .withMessage("A quantidade em estoque deve ser um número!")
            .custom((value) => {
                if (value < 0)
                    throw new Error(
                        "A quantidade em estoque deve ser maior ou igual a zero."
                    );
                return true;
            }),
        body("images")
            .isArray({ min: 1 })
            .withMessage("Por favor, informe uma url de imagem.")
            .custom((images) => {
                for (let image of images) {
                    if (typeof image !== "string")
                        throw new Error(
                            "Por favor, informe uma url em formato string."
                        );

                    if (!validUrl.isWebUri(image))
                        throw new Error(
                            `A url ${image} é inválida, por favor informe uma url válida.`
                        );
                }
                return true;
            }),
    ];
};

module.exports = {
    registerProductValidation,
};
