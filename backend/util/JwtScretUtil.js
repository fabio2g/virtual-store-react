const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

class JwtSecretUtil {
    static generatedHash = async (password) => {
        try {
            const salt = await bcrypt.salt();
            const passwordHash = await bcrypt.hash(password, salt);
            return passwordHash;
        } catch (error) {
            // ########### tratar esse erro ################
            throw new Error("Erro ao gerar hash da senha");
            // #############################################
        }
    };

    static generatedToken = (id) => {
        return jwt.sign({ id }, jwtSecret, {
            expiresIn: "5d",
        });
    };
}

module.exports = JwtSecretUtil;
