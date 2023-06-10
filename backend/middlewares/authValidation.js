const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authValidation = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = await jwt.verify(token, jwtSecret);

        // Armazena os dados do token decodificado para uso posterior, se necessário
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido." });
    }
};

module.exports = authValidation;
