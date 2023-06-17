const express = require("express");
const { uploadImagens, deleteImagens } = require("../controller/uploadController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadFoto, produtoImgResize } = require("../middlewares/uploadImagens");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadFoto.array("images", 10),
  produtoImgResize,
  uploadImagens
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImagens);

module.exports = router;