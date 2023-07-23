const mongoose = require("mongoose");
const { Schema } = mongoose;

const shoppingCartSchema = new Schema(
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
        SubTotal: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        role: {
            type: Number,
            default: 1, // 0 - admin, 1 - user
        },
        shoppingCart: [shoppingCartSchema],
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
