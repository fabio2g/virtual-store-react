const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
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
        trim: true,
        default: null,
    },
    color: {
        type: String,
        uppercase: true,
        trim: true,
        enum: [
            "VERMELHO",
            "AZUL",
            "VERDE",
            "PRETO",
            "BRANCO",
            "AMARELO",
            "ROXO",
            "LARANJA",
            "MARROM",
            "CINZA",
            "PRATA",
            "DOURADO",
            "ROSA",
        ],
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    categories: {
        type: String,
        uppercase: true,
        trim: true,
        enum: [
            "ELETRÔNICOS",
            "ROUPAS",
            "ALIMENTOS",
            "DECORAÇÃO",
            "ESPORTES",
            "BELEZA",
            "AUTOMOTIVO",
            "BRINQUEDOS",
            "MÓVEIS",
            "JOGOS",
            "SAÚDE",
            "LIVROS",
            "PAPÉIS",
            "INSTRUMENTOS",
            "PET",
            "OUTROS",
        ],
    },
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
            trim: true,
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
