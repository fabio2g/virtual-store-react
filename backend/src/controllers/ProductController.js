const Product = require("../models/Product");
const ProductService = require("../services/ProductService");

/**
 * Serviço responsável por criar um novo produto
 */
const createProduct = async (req, res) => {
    const productData = req.body;

    const result = await ProductService.save(productData);

    if (!result.status) return res.status(401).json(result);
    res.status(200).json(result);
};

/**
 * Serviço responsável por listar todos os produtos
 */
const getAllProduct = async (req, res) => {
    const result = await ProductService.getProduct();

    if (!result.status) return res.status(401).json(result);
    res.status(200).json(result);
};

/**
 * Serviço responsável por listar o produto pelo ID
 */
const getProductById = async (req, res) => {
    const productId = req.params.id;

    const result = await ProductService.getProduct(productId);

    if (!result.status) return res.status(401).json(result);
    res.status(200).json(result);
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
