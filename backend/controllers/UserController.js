const User = require("../models/User");
const bcrypt = require("bcrypt");

const generatedToken = (id) => {
    return id;
};

/**
 * A função de registro recebe os dados do usuário, faz a verificação do email 
 * para validar se o usuário está utilizando um email cadastrado na base de dados,
 * faz a cryptografia da senha e registra o novo usuário retornando um JSON com o 
 * ID e Token do novo registro. 
 */
const register = async (req, res) => {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.status(422).json({ error: ["Por favor, utilize outro e-mail."] });
        return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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
