// const Adrress = require("../models/Address");
const Adrress = require("../models/Address");
const Addrress = require("../models/Address");
const User = require("../models/User");

const addAddress = async (req, res, next) => {
    const address = ({ street, number, city, state, country, cep } = req.body);
    const user = req.user;

    try {
        // check for existing addresses
        const foundAddress = await Addrress.findOne(address);

        if (!foundAddress) {
            const newAddress = await Adrress.create(address);

            foundAddress = newAddress;
        }

        if (!user.address.equals(foundAddress._id)) {
            await User.findByIdAndUpdate(user._id, {
                address: address._id,
            });

            return res.status(201).json({
                success: true,
                message: "Endereço atualizado com sucesso.",
                addressId: user.address,
                newAddressId: foundAddress._id,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Endereço atualizado com sucesso.",
        });
    } catch (error) {
        res.send(error);
    }
};

module.exports = addAddress;
