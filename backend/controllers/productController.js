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

    const product = Product.findOne({ serie });

    if (product) {
        res.status(422).json({
            success: "false",
            message: "Já existe um produto cadastrado com esse número de série",
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
