const mongoose = require("mongoose");
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

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json("Ocorreu um erro ao obter os produtos.");
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId))
        return res
            .status(422)
            .json({ success: false, error: "O ID é inválido" });

    try {
        const product = await Product.findById(productId);

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({
            success: false,
            erro: "Ocorreu um erro ao obter o produto.",
        });
    }
};

const updateProduct = async (req, res) => {
    const {
        _id,
        name,
        serie,
        brand,
        color,
        description,
        categories,
        price,
        stockQuantity,
        images,
    } = req.body;

    try {
        const product = await Product.updateOne(
            { _id },
            {
                name,
                serie,
                brand,
                color,
                description,
                categories,
                price,
                stockQuantity,
                images,
            }
        );

        const updateProduct = await Product.findOne({ _id });

        if (product.modifiedCount === 0) {
            res.status(422).json({
                success: false,
                message: "Não ouveram modificações no registro do produto.",
                data: updateProduct,
            });
            return;
        }

        res.status(201).json({
            success: true,
            data: updateProduct,
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            error: "Ouve um erro inesperado, por favor tente mais tarde.",
        });
    }
};

module.exports = {
    register,
    getAllProduct,
    getProductById,
    updateProduct,
};
