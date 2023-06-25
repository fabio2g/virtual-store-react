const Product = require("../models/Product");

const register = async (req, res) => {
    const {
        name,
        code,
        description,
        supplierId,
        categories,
        price,
        stockQuantity,
        images,
        createAt,
        updateAt,
    } = req.body;

    // Registra os dados no banco
    const newProduct = await Product.create({
        name,
        code,
        description,
        supplierId,
        categories,
        price,
        stockQuantity,
        images,
        createAt,
        updateAt,
    });

    if (!newProduct) {
        res.json({ error: ["Erro ao registrar o produto!"] });
        return;
    }

    res.status(201).json({ message: "Produto registrado com sucesso!" });
};

module.exports = {
    register,
};
