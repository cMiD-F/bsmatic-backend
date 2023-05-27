const express = require("express");
const {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deletaProduto,
  addListadeDesejos,
  classificacao,
  uploadImagens,
  deleteImagens,
} = require("../controller/produtoController");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadFoto, produtoImgResize } = require("../middlewares/uploadImagens");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduto);
router.put(
  "/upload/",
  authMiddleware,
  isAdmin,
  uploadFoto.array("imagens", 10),
  produtoImgResize,
  uploadImagens
);

router.get("/:id", getaProduto);
router.put("/ListadeDesejos", authMiddleware, addListadeDesejos);
router.put("/classificacao", authMiddleware, classificacao);

router.put("/:id", authMiddleware, isAdmin, updatedProduto);
router.delete("/:id", authMiddleware, isAdmin, deletaProduto);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImagens);

router.get("/", getAllProduto);

module.exports = router;
