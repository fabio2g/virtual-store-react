const mongoose = require("mongoose");

const userDB = process.env.DATABASE_USER;
const passDB = process.env.DATABASE_PASSWORD;

mongoose.set("strictQuery", false);

const conn = async () => {
    try {
        const connectionDB = await mongoose.connect(
            `mongodb+srv://${userDB}:${passDB}@cluster0.gaxnhat.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("[mongoose] base de dados conectada");

        return connectionDB;
    } catch (error) {
        console.log("Erro ao conectar o banco de dados");
        console.log(error);
    }
};

conn();

module.exports = conn;

// mongodb+srv://fabio2g:<password>@cluster0.gaxnhat.mongodb.net/?retryWrites=true&w=majority
