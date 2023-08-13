require("dotenv").config();
require("./src/config/database");

const express = require("express");
const app = express();

/**
 * Configuração de dados da API
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Arquivo de rotas
 */
const router = require("./src/routes/Routes");
const bodyParser = require("body-parser");
app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log(`[app] servidor rodando na port ${process.env.PORT}`);
});
