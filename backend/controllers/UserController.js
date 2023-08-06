const User = require("../models/User");
const Product = require("../models/Product");
const UserService = require("../services/UserService");

/**
 * Função assíncrona responsável por realizar o processo de cadastro (signup) de um novo usuário.
 * @param {Object} req - O objeto de requisição contendo os dados enviados pelo cliente.
 * @param {Object} res - O objeto de resposta que será enviado ao cliente.
 */
const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // Chama o serviço UserService.save() para salvar o novo usuário no banco de dados.
    const newUser = await UserService.save({
        name,
        email,
        password,
    });

    // Verifica se o status do objeto newUser é false (indicando erro no salvamento do usuário).
    // Se o status do objeto newUser for true (indicando sucesso no salvamento do usuário).
    if (!newUser.status) return res.status(401).json(newUser);
    res.status(200).json(newUser);
};

/**
 * Função assíncrona responsável por realizar o processo de autenticação (login) do usuário.
 * @param {Object} req - O objeto de requisição contendo os dados enviados pelo cliente.
 * @param {Object} res - O objeto de resposta que será enviado ao cliente.
 */
const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Chama o serviço UserService.login() para realizar o processo de autenticação do usuário.
    const user = await UserService.login({
        email,
        password,
    });

    // Verifica se o status do objeto user é false (indicando falha na autenticação).
    // Se o status do objeto user for true (indicando sucesso na autenticação),
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
