const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generatedToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "5d",
    });
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
 * Função responsável por realizar o login do usuário.
 *
 * @param {Object} req - Objeto de solicitação HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {void}
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // verifica se o email/usuário está registrado
    if (!user) {
        res.status(404).json([{ error: "Informe um e-mail válido" }]);
        return;
    }

    // verifica se a senha está correta
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(401).json([
            { error: "Senha incorreta, por favor verifique sua senha." },
        ]);
        return;
    }

    res.status(200).json({
        _id: user._id,
        token: generatedToken(user._id),
    });
};

/**
 * Função responsável por fornecer os dados do usuário logado.
 *
 * @param {Object} req - Objeto de solicitação HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @returns {void}
 */

const profile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        res.json({ message: "Errro profile" });
    }
};

module.exports = {
    register,
    login,
    profile,
};
