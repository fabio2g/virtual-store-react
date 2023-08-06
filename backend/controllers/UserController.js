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

    /**
     * Verifica o status retornado do método save().
     * Caso o retorno seja false, a resposta HTTP será configurada com o status 401 (Unauthorized)
     * e o objeto newUser será enviado como resposta JSON.
     * Caso contrário, a resposta HTTP será configurada com o status 200 (OK - Sucesso)
     * e o objeto newUser será enviado como resposta JSON.
     */
    if (!newUser.status) return res.status(401).json(newUser);
    res.status(200).json(newUser);
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.login({
        email,
        password,
    });

    if (!user.status) return res.status(401).json(user);
    res.status(200).json(user);
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
    signIn,
    profile,
    addProductToCart,
};
