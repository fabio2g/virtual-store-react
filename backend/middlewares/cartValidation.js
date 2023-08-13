const mongoose = require("mongoose");

/**
 * Middleware para validar os dados de entrada do carrinho.
 * Verifica se a ID do produto é válida e se a quantidade é um número válido maior que 0.
 * Em caso de erros, retorna uma resposta de erro com os detalhes.
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
 * @param {Function} next - A função para continuar o fluxo da requisição.
 */
const cartInputValidation = (req, res, next) => {
    const { productId, quantity } = req.body;

    const errors = [];

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        errors.push("A ID do produto é inválida.");
    }

    if (typeof quantity !== "number" || quantity <= 0) {
        errors.push("A quantidade deve ser um número válido maior que 0.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ status: false, errors });
    }

    next();
};

module.exports = cartInputValidation;
