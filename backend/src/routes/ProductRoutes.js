const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct,
    getAllProduct,
    getProductById,
    deletePRoduct,
} = require("../controllers/ProductController");

const {
    productValidation,
    updateProductValidation,
    getProductValidation,
} = require("../middlewares/productValidation");

const authGuard = require("../middlewares/authGuard");

const validate = require("../middlewares/handleValidation");
const isAuthenticated = require("../middlewares/authenticateRole");

/**
 * Rota responsável pela criação de produtos
 */
router.post(
    "/register",
    authGuard,
    isAuthenticated,
    productValidation(),
    validate,
    createProduct
);

/**
 * Rota responsável por listar os produtos do banco
 */
router.get("/get", getAllProduct);

/**
 * Rota responsável por buscar produto pelo seu ID
 */
router.get("/get/:id", getProductById);

/**
 * Rota responsável por atualizar produto
 */
router.put(
    "/update",
    authGuard,
    isAuthenticated,
    productValidation(),
    updateProductValidation(),
    validate,
    updateProduct
);

/**
 * Rota responsável por deletar produto
 */
router.delete("/delete/:id", authGuard, isAuthenticated, deletePRoduct);

module.exports = router;
