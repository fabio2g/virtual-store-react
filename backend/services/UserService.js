const User = require("../models/User");
const JwtSecretUtil = require("../util/JwtScretUtil");

class UserService {
    static save = async (user) => {
        try {
            const registeredUser = await User.findOne({ email: user.email });

            if (registeredUser) {
                throw new Error("O e-mail informado já está sendo utilizado.");
            }

            const passwordHash = JwtSecretUtil.generatedHash(user.password);

            const newUser = User.create({
                name: user.name,
                email: user.email,
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
}

module.exports = UserService;
