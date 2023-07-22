const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const products = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res
                .status(400)
                .json({ error: "Products array is missing or empty." });
        }

        let totalPrice = 0;

        for (let product of products) {
            const item = await Product.findById(product.productId);

            if (!item) {
                return res.status(404).json({ error: "Product not found." });
            }

            product.unitPrice = item.price;
            product.totalPrice = product.quantity * product.unitPrice;
            totalPrice += product.totalPrice;
        }

        const newOrder = await Order.create({
            userId,
            products,
            totalPrice,
        });

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = createOrder;
