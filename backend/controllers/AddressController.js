// const Adrress = require("../models/Address");
const Adrress = require("../models/Address");
const User = require("../models/User");

const addAddress = async (req, res) => {
    const { street, number, city, state, country, cep } = req.body;
    const userId = req.user.id;

    try {
        const newAddress = await Adrress.create({
            street,
            number,
            city,
            state,
            country,
            cep,
        });

        if (!newAddress) return res.send("não foi");

        const userAddress = await User.updateOne(
            {
                userId,
            },
            {
                address: newAddress._id,
            }
        );

        res.send(userAddress);
    } catch (error) {
        res.send(error);
    }
};

module.exports = addAddress;
