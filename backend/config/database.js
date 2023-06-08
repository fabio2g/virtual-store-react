const mongoose = require("mongoose");

const userDB = process.env.DB_USER;
const passDB = process.env.DB_PASSWORD;

mongoose.set("strictQuery", false);

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${userDB}:${passDB}@cluster0.gaxnhat.mongodb.net/?retryWrites=true&w=majority`
        );

        console.log(`[mongoose] base de dados conectada`);

        return dbConn;
    } catch (error) {
        console.log("Erro ao conectar o banco!");
        console.log(error);
    }
};

conn();

module.exports = conn;
