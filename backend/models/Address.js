const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: String,
    number: Number,
    city: String,
    state: String,
    country: String,
    cep: {
        type: String,
        unique: true,
    },
});

const Adrress = mongoose.model("Address", addressSchema);

module.exports = Adrress;
