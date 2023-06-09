const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generatedToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "5d",
    });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
        res.status(422).json({
            success: false,
            error: ["Por favor, utilize outro e-mail."],
        });
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
        res.status(422).json({
            success: false,
            error: ["Erro ao criar usuário."],
        });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generatedToken(newUser._id),
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({
            success: false,
            error: "Informe um e-mail válido",
        });
        return;
    }

    if (!bcrypt.compare(password, user.password)) {
        res.status(401).json([
            {
                success: false,
                error: "Senha incorreta, por favor verifique sua senha.",
            },
        ]);
        return;
    }

    res.status(200).json({
        success: true,
        _id: user._id,
        token: generatedToken(user._id),
    });
};

const profile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.json({ message: "Erro profile" });
    }
};

module.exports = {
    register,
    login,
    profile,
};
