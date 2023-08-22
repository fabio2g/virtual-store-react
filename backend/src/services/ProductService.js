const Product = require("../models/Product");

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
}

module.exports = ProductService;
