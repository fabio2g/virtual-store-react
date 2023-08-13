const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [productSchema],
    valueOfTheOrder: {
        type: Number,
        required: true,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
