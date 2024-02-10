const express = require("express");
const {
  createProduto,
  getaProduto,
  getAllProduto,
  updatedProduto,
  deleteProduto,
  addToWishlist,
  rating,
} = require("../controller/produtoCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduto);

router.get("/:id", getaProduto);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/classificacao", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updatedProduto);
router.delete("/:id", authMiddleware, isAdmin, deleteProduto);

router.get("/", getAllProduto);

module.exports = router;