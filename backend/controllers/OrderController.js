const Order = require("../models/Order");
const Product = require("../models/Product");

const calcTotalPrice = (obj) => {};

const createOrder = async (req, res) => {
    const user = req.user._id;

    const products = req.body;

    if (!products) {
        return;
    }

    for (let product of products) {
        let item = await Product.findById(product.productId);

        product.unitPrice = item.price;
        product.totalPrice = product.quantity * product.unitPrice;
    }

    // const newOrder = await Order.create({
    //     user,
    //     products,
    //     totalPrice,
    // });

    res.status(201).json(user);
};

module.exports = createOrder;
