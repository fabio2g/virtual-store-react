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

app.listen(3000);
