const express = require("express");
const {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deletaProduto,
} = require("../controller/produtoController");

const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduto);
router.get("/:id", getaProduto);
router.put("/:id", authMiddleware, isAdmin, updatedProduto);
router.delete("/:id", authMiddleware, isAdmin, deletaProduto);
router.get("/", getAllProduto);

module.exports = router;
