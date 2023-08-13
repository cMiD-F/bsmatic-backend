const express = require("express");
const {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deleteProduto,
  addListadeDesejos,
  rating,
} = require("../controller/produtoCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduto);

router.get("/:id", getaProduto);
router.put("/ListadeDesejos", authMiddleware, addListadeDesejos);
router.put("/classificacao", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updatedProduto);
router.delete("/:id", authMiddleware, isAdmin, deleteProduto);

router.get("/", getAllProduto);

module.exports = router;
