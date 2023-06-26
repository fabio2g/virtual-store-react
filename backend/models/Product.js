const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    serie: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        uppercase: true,
        trim: true,
        enum: ["RED"],
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
    assessment: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
