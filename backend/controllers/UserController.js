const User = require("../models/User");
const bcrypt = require("bcrypt");

const generatedToken = (id) => {
    return id;
};

/**
 * Função responsável por registrar um novo usuário.
 *
 * @param {Object} req - Objeto de solicitação HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {void}
 */
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // verifica se o email já esta em uso
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.status(422).json({ error: ["Por favor, utilize outro e-mail."] });
        return;
    }

    // cria uma senha cryptografada
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // perciste os dados no banco
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    if (!newUser) {
        res.status(422).json({ error: ["Erro ao criar usuário."] });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generatedToken(newUser._id),
    });
};

/**
 * - Realiza a validação de login do usuário
 */
const login = async (req, res) => {
    await res.status(201).json({ message: "Login realizado com sucesso." });
};

module.exports = {
    register,
    login,
};
