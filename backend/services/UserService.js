const User = require("../models/User");
const JwtSecretUtil = require("../util/JwtScretUtil");

class UserService {
    static save = async (user) => {
        try {
            const registeredUser = await User.findOne({ email: user.email });

            if (registeredUser)
                throw new Error("O e-mail informado já está sendo utilizado.");

            const passwordHash = await JwtSecretUtil.generatedHash(
                user.password
            );

            if (!passwordHash)
                throw new Error("Ocorreu um erro ao gerar o hash da senha.");

            const newUser = User.create({
                name: user.name,
                email: user.email,
                password: passwordHash,
            });

            return {
                status: true,
                data: {
                    _id: newUser._id,
                    token: JwtSecretUtil.generatedToken(newUser._id),
                },
            };
        } catch (error) {
            return { status: false, error: error.message };
        }
    };
}

module.exports = UserService;
