const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: [
        {
            type: String,
        },
    ],
    price: {
        type: Number,
        require: true,
    },
    stockQuantity: {
        type: Number,
        default: 0,
    },
    sales: {
        type: Number,
        default: 0,
    },
    images: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;