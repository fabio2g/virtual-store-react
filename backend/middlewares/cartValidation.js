const mongoose = require("mongoose");

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
