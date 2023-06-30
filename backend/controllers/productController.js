const Product = require("../models/Product");

const register = async (req, res) => {
    const {
        name,
        serie,
        brand,
        color,
        description,
        categories,
        price,
        stockQuantity,
        images,
        assessment,
    } = req.body;

    const product = await Product.findOne({ serie });

    if (product) {
        res.status(422).json({
            success: "false",
            message:
                "O produto não pode ser cadastrado, já existe um produto cadastrado com o mesmo número de série.",
        });
        return;
    }

    // Registra os dados no banco
    const newProduct = await Product.create({
        name,
        serie,
        brand,
        color,
        description,
        categories,
        price,
        stockQuantity,
        images,
        assessment,
    });

    if (!newProduct) {
        res.json({ sucess: false, error: "Erro ao registrar o produto!" });
        return;
    }

    res.status(201).json({
        sucess: true,
        message: "Produto registrado com sucesso!",
        data: newProduct,
    });
};

module.exports = {
    register,
};
