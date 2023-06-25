const create = async (req, res) => {
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

    // Validações de inputs
    

    const newProduct = {
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
    };
};
