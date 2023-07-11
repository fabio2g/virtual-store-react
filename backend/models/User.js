const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
        },
        password: String,
        role: {
            type: Number,
            default: 1, // 0 - admin, 1 - user
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
