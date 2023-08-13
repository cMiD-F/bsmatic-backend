const express = require("express");
const {
  createAplicacao,
  updateAplicacao,
  deleteAplicacao,
  getAplicacao,
  getallAplicacao,
} = require("../controller/aplicacaoCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createAplicacao);
router.put("/:id", authMiddleware, isAdmin, updateAplicacao);
router.delete("/:id", authMiddleware, isAdmin, deleteAplicacao);
router.get("/:id", getAplicacao);
router.get("/", getallAplicacao);

module.exports = router;
