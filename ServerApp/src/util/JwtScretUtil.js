const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

class JwtSecretUtil {
    /**
     * Função assíncrona responsável por gerar o hash de uma senha.
     * @param {string} password - A senha a ser criptografada.
     * @returns {string|null} - Retorna o hash da senha ou null em caso de erro.
     */
    static generatedHash = async (password) => {
        try {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            return passwordHash;
        } catch (error) {
            console.error(`${__dirname}\n${error.stack}`);
            return null;
        }
    };

    static generatedToken = (id) => {
        return jwt.sign({ id }, jwtSecret, {
            expiresIn: "5d",
        });
    };

    /**
     * Função assíncrona responsável por comparar uma senha em texto claro com um hash de senha.
     * @param {string} plaintextPassword - A senha em texto claro a ser comparada.
     * @param {string} hashedPassword - O hash da senha a ser comparado.
     * @returns {boolean|null} - Retorna true se a senha coincidir com o hash, ou null em caso de erro.
     */
    static comparePassaword = async (plaintextPassword, hashedPassword) => {
        try {
            const isMatch = await bcrypt.compare(
                plaintextPassword,
                hashedPassword
            );

            return isMatch;
        } catch (error) {
            console.error(`${__dirname}\n${error.stack}`);
            return null;
        }
    };
}

module.exports = JwtSecretUtil;
