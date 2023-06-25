require("dotenv").config();
require("./config/database");

const express = require("express");
const app = express();

/**
 * Configuração de dados da API
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Arquivo de rotas
 */
const router = require("./routes/Routes");
app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log(`[app] servidor rodando na port ${process.env.PORT}`);
});
