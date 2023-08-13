const express = require("express");
const {
  createPergunta,
  updatePergunta,
  deletePergunta,
  getPergunta,
  getallPergunta,
} = require("../controller/pergCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createPergunta);
router.put("/:id", authMiddleware, isAdmin, updatePergunta);
router.delete("/:id", authMiddleware, isAdmin, deletePergunta);
router.get("/:id", getPergunta);
router.get("/", getallPergunta);

module.exports = router;
