const Product = require("../models/Product");
const mongoose = require("mongoose");

function idIsValid(id) {
    return mongoose.Types.ObjectId.isValid(id) ? true : false;
}

class ProductService {
    static save = async (data) => {
        try {
            const isProduct = await Product.findOne({ serie: data.serie });

            if (isProduct) {
                throw new Error(
                    "Não é possível cadastrar o produto, pois já há um registro de um produto com o mesmo número de série."
                );
            }

            const newProduct = await Product.create(data);

            if (!newProduct) {
                throw new Error(
                    "Ocorreu um problema durante o processo de registro do produto."
                );
            }

            return {
                status: true,
                data: newProduct,
            };
        } catch (error) {
            return {
                status: false,
                error: `Ocorreu um erro ao processar a solicitação: ${error.message}`,
            };
        }
    };

    static getProduct = async (id) => {
        try {
            if (id) {
                if (!idIsValid(id)) {
                    throw new Error("Id inválido.");
                }

                const product = await Product.findById(id);

                if (!product) {
                    throw new Error("Produto não encontrado.");
                }

                return {
                    status: true,
                    data: product,
                };
            } else {
                const products = await Product.find();

                if (!products || products.length === 0) {
                    throw new Error("Nenhum produto encontrado");
                }

                return {
                    status: true,
                    data: products,
                };
            }
        } catch (error) {
            return {
                status: false,
                error: error.message,
            };
        }
    };
}

module.exports = ProductService;
