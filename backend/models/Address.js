const mongoose = require("mongoose");
const { Schema } = mongoose;

const addresSchema = new Schema({
    street: String,
    number: Number,
    city: String,
    state: String,
    country: String,
    cep: String,
});

const Adrress = mongoose.model("Address", addresSchema);

module.exports = Adrress;
