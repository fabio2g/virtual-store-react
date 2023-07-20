const Address = require("../models/Address");
const User = require("../models/User");

const updateAddress = async (req, res) => {
    try {
        const { street, number, city, state, country, cep } = req.body;
        const user = req.user;

        let foundAddress = await Address.findOne({
            street,
            number,
            city,
            state,
            country,
            cep,
        });

        if (!foundAddress) {
            foundAddress = await Address.create({
                street,
                number,
                city,
                state,
                country,
                cep,
            });
        }

        await User.findByIdAndUpdate(user._id, {
            addressId: foundAddress._id,
            updatedAt: Date.now(),
        });

        return res.status(201).json({
            success: true,
            message: "Endereço atualizado com sucesso.",
            data: await User.findById(user._id).select("-password -orderId"),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ocorreu um erro ao adicionar o endereço.",
            error: error.message,
        });
    }
};

module.exports = updateAddress;
