const User = require("../models/User");

const {
    generatedHash,
    generatedToken,
    comparePassaword,
} = require("../util/JwtScretUtil");

class UserService {
    /**
     * Função assíncrona que salva um usuário no banco de dados.
     * @param {*} data - Objeto contendo os dados do usuário a ser salvo.
     * @returns - Retorna um objeto com informações sobre o resultado da operação.
     */
    static save = async (data) => {
        try {
            const user = await User.findOne({ email: data.email });

            // Criar um método para restabelecer a conta deletetada do usuário
            if (user)
                throw new Error("O e-mail informado já está sendo utilizado.");

            const passwordHash = await generatedHash(data.password);

            if (!passwordHash)
                throw new Error("Ocorreu um erro ao gerar o hash da senha.");

            const newUser = User.create({
                name: data.name,
                email: data.email,
                password: passwordHash,
            });

            return {
                status: true,
                data: {
                    _id: newUser._id,
                    token: generatedToken(newUser._id),
                },
            };
        } catch (error) {
            return { status: false, error: error.message };
        }
    };

    /**
     * Função assíncrona que realiza e autoriza o login do usuário.
     * @param {*} data - Objeto contendo os dados do usuário a ser logado.
     * @returns - Retorna um objeto com informações sobre o resultado da operação.
     */
    static login = async (data) => {
        try {
            const user = await User.findOne({ email: data.email });

            if (!user) throw new Error("Informe um e-mail válido.");

            if (!(await comparePassaword(data.password, user.password))) {
                throw new Error(
                    "Senha incorreta, por favor verifique sua senha."
                );
            }

            return {
                status: true,
                data: {
                    _id: user._id,
                    token: generatedToken(user._id),
                },
            };
        } catch (error) {
            return { status: false, error: error.message };
        }
    };

    /**
     * Método estático para excluir um usuário.
     * @param {string} id - ID do usuário a ser excluído.
     * @returns {Object} - Objeto contendo o status da operação e uma mensagem.
     */
    static delete = async (id) => {
        try {
            const user = await User.findByIdAndUpdate(
                {
                    _id: id,
                },
                { deleted: true }
            );

            return {
                status: true,
                message: `Usuário ${user._id} deletado com sucesso.`,
            };
        } catch (error) {
            return { status: false, error: error.message };
        }
    };
}

module.exports = UserService;
