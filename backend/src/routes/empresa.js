const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

router.post("/register", empresaController.registerEmpresa);
router.post("/:subdominio/produtos", empresaController.addProduto);
router.get("/:subdominio/cardapio", empresaController.getCardapio);
router.get("/:subdominio/produtos", empresaController.listProdutos);
router.delete("/:subdominio/produtos/:id", empresaController.deleteProduto);
router.put("/:subdominio/produtos/:id", empresaController.updateProduto);

module.exports = router;