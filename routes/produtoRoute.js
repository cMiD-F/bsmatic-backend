const express = require("express");
const {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deletaProduto,
  addListadeDesejos,
  classificacao,
  
} = require("../controller/produtoController");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduto);

router.get("/:id", getaProduto);
router.put("/ListadeDesejos", authMiddleware, addListadeDesejos);
router.put("/classificacao", authMiddleware, classificacao);

router.put("/:id", authMiddleware, isAdmin, updatedProduto);
router.delete("/:id", authMiddleware, isAdmin, deletaProduto);


router.get("/", getAllProduto);

module.exports = router;
