const mongoose = require("mongoose");
const Product = require("../models/Product");

function idIsValid(id) {
    return mongoose.Types.ObjectId.isValid(id) ? true : false;
}

/**
 * Serviço responsável por criar um novo produto
 */
const createProduct = async (req, res) => {
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

/**
 * Serviço responsável por listar todos os produtos
 */
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json("Ocorreu um erro ao obter os produtos.");
    }
};

/**
 * Serviço responsável por listar o produto pelo ID
 */
const getProductById = async (req, res) => {
    const productId = req.params.id;

    if (!idIsValid(productId))
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

/**
 * Serviço responsável por autualizar o produto
 */
const updateProduct = async (req, res) => {
    const id = req.params.id;

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
    } = req.body;

    try {
        const product = await Product.updateOne(
            { id },
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

        const updateProduct = await Product.findOne({ id });

        if (product.modifiedCount === 0) {
            res.status(422).json({
                success: false,
                message: "Não ouveram modificações no registro do produto.",
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

/**
 * Serviço responsável por deletar o produto
 */
const deletePRoduct = async (req, res) => {
    const id = req.params.id;

    if (!idIsValid(id)) {
        res.status(400).json({ success: false, error: "ID inválido." });
        return;
    }

    try {
        await Product.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Produto deletado com sucesso.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Ouve um erro inesperado, por favor tente mais tarde.",
        });
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deletePRoduct,
};
