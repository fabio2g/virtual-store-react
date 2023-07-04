const User = require("../models/User");

const addAddress = async (req, res) => {
    const { street, number, city, state, country, cep } = req.body;
    const userId = req.user.id;

    let ad = { street, number, city, state, country, cep };

    try {
        const updatedUser = await User.updateOne(
            { _id: userId },
            {
                address: ad,
            }
        );

        res.send({ user: updatedUser });
    } catch (error) {
        res.status(422).json({
            success: false,
            error: "Erro ao atualizar o usuário.",
        });
    }
};

module.exports = addAddress;
