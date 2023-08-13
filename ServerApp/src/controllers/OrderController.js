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

        let valueOfTheOrder = 0;

        for (let product of products) {
            const item = await Product.findById(product.productId);

            if (!item) {
                return res.status(404).json({ error: "Product not found." });
            }

            product.price = item.price;
            product.totalPrice = product.quantity * product.price;
            valueOfTheOrder += product.totalPrice;
        }

        const newOrder = await Order.create({
            userId,
            products,
            valueOfTheOrder,
            addressId: req.user.addressId,
        });

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: "Internal server error.", message: err });
    }
};

module.exports = createOrder;
