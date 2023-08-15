const UserService = require("../services/UserService");

/**
 * Função assíncrona responsável por realizar o processo de cadastro (signup) de um novo usuário.
 * @param {Object} req - O objeto de requisição contendo os dados enviados pelo cliente.
 * @param {Object} res - O objeto de resposta que será enviado ao cliente.
 */
const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await UserService.save({
        name,
        email,
        password,
    });

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

    const user = await UserService.login({
        email,
        password,
    });

    if (!user.status) return res.status(401).json(user);
    res.status(200).json(user);
};

/**
 * Função assíncrona que excluir uma conta de usuário.
 * @param {Object} req - Objeto da solicitação HTTP contendo informações da solicitação.
 * @param {Object} res - Objeto de resposta HTTP usado para enviar uma resposta ao cliente.
 */
const deleteAccount = async (req, res) => {
    const userId = req.params.id;

    const result = await UserService.delete(userId);

    if (!result.status) return res.status(401).json(result);
    res.status(200).json(result);
};

const profile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

/**
 * Função assíncrona que adiciona produtos ao carrinho do usuário.
 * @param {Object} req - Objeto da solicitação HTTP contendo informações da solicitação.
 * @param {Object} res - Objeto de resposta HTTP usado para enviar uma resposta ao cliente.
 */
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cart = await UserService.cartUpload({ userId, productId, quantity });

    if (!cart.status) return res.status(401).json(cart);
    res.status(201).json(cart);
};

module.exports = {
    signUp,
    signIn,
    deleteAccount,
    profile,
    addToCart,
};
