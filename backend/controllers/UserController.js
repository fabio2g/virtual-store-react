const User = require("../models/User");
const Product = require("../models/Product");
const UserService = require("../services/UserService");

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await UserService.save({
        name,
        email,
        password,
    });

    res.json(newUser);
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

const addProductToCart = async (req, res) => {
    try {
        const user = req.user;

        const { productId, quantity } = req.body;

        if (!user) {
            res.status(422).json({
                success: false,
                message: "Nenhum  usuário encontrado.",
            });
        }

        const product = await Product.findById({ _id: productId });

        const newProductCart = {
            productId: product._id,
            quantity,
            price: product.price,
        };

        const updateUser = User.findByIdAndUpdate(
            { _id: user._id },
            {
                shoppingCart: product,
            },
            {
                new: true,
            }
        );

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    login,
    profile,
    addProductToCart,
};
