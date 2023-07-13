const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: {
        type: String,
        trim: true,
        required: true,
    },
    number: {
        type: Number,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    cep: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
});

const Adrress = mongoose.model("Address", addressSchema);

module.exports = Adrress;
