const express = require("express");
const router = express();

/**
 * Rotas do usuário
 */
router.use("/user", require('./UserRoutes'));

/**
 * Rota principal
 */
router.get("/", (req, res) => {
    res.send("Funcionou...");
});

module.exports = router;
