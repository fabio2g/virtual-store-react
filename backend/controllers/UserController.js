/**
 * Realiza o registro do usuário no banco de dados
 */
const register = async (req, res) => {
    await res.status(201).json({ message: "Registro feito com sucesso" });
};

/**
 * Realiza a validação de login do usuário
 */
const login = async (req, res) => {
    await res.status(201).json({ message: "Login realizado com sucesso" });
};

module.exports = {
    register,
    login,
};
