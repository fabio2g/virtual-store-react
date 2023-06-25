const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    supplierId: [
        {
            supplierId: {
                type: Schema.Types.ObjectId,
                ref: "supplier",
            },
            name: String,
            address: String,
            phone: String,
            email: String,
        },
    ],
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
    images: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
