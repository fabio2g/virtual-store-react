/**
 * Realiza o registro do usuário no banco de dados
 */
const register = async (req, res) => {
    res.send("registro ok");
};

/**
 * Realiza a validação de login do usuário
 */
const login = async (req, res) => {
    res.send("User login ok");
};

module.exports = {
    register,
    login,
};
