const mongoose = require("mongoose");

const { body } = require("express-validator");
const validUrl = require("valid-url");

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

const productValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome deve ter pelo menos 3 caracteres."),
        body("serie")
            .isString()
            .withMessage("O número de série é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O número de série deve ter pelo menos 3 caracteres."),
        body("color")
            .isString()
            .withMessage("A cor é obrigatória.")
            .custom((color) => {
                if (!enumColors.includes(color.toUpperCase()))
                    throw new Error(
                        `Por favor, informe uma cor válida. As opções válidas são: ${enumColors.join(
                            ", "
                        )}.`
                    );

                return true;
            }),
        body("description")
            .isString()
            .withMessage("Informe um descrição.")
            .isLength({ min: 10 })
            .withMessage("A descrição deve ter pelo menos 10 caracteres."),
        body("categories")
            .isString()
            .withMessage("Informe uma categoria.")
            .custom((value) => {
                if (typeof value === "string") {
                    if (!enumCategories.includes(value.toUpperCase()))
                        throw new Error(
                            `Por favor, informe uma categoria válida. As opções válidas são: ${enumCategories.join(
                                ", "
                            )}.`
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
            .withMessage("A quantidade em estoque deve ser um número.")
            .custom((value) => {
                if (value < 0)
                    throw new Error(
                        "A quantidade em estoque deve ser maior ou igual a zero."
                    );
                return true;
            }),
        body("images")
            .isArray({ min: 1 })
            .withMessage("Informe uma URL de imagem.")
            .custom((images) => {
                for (let image of images) {
                    if (typeof image !== "string")
                        throw new Error(
                            "Informe uma url em formato de string."
                        );

                    if (!validUrl.isWebUri(image))
                        throw new Error(
                            `A url ${image} é inválida, informe uma url válida.`
                        );
                }
                return true;
            }),
    ];
};

const updateProductValidation = () => {
    return [
        body("_id")
            .isString()
            .withMessage("Infome o ID do produto.")
            .custom((id) => {
                const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

                if (!isValidObjectId) throw new Error("Informe um ID válido.");

                return true;
            }),
    ];
};

module.exports = {
    productValidation,
    updateProductValidation,
};
