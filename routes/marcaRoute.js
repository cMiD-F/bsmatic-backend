const express = require("express");
const {
  createMarca,
  updateMarca,
  deleteMarca,
  getMarca,
  getallMarca,
} = require("../controller/marcaController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createMarca);
router.put("/:id", authMiddleware, isAdmin, updateMarca);
router.delete("/:id", authMiddleware, isAdmin, deleteMarca);
router.get("/:id", getMarca);
router.get("/", getallMarca)

module.exports = router;