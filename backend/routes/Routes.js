const express = require("express");
const router = express();

/**
 * Rotas do usuário
 */
router.use("/user", require("./UserRoutes"));
router.use("/user", require("../routes/AddressRoutes"));

/**
 * Rotas de produto
 */
router.use("/product", require("./ProductRoutes"));
router.use("/product", require("./OrderRoutes"));

/**
 * Rota principal
 */
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Olá, bem-vindo à API!",
    });
});

module.exports = router;
