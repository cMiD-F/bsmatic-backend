const express = require("express");
const {
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
  getallCategoria,
} = require("../controller/blogCatController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategoria);
router.put("/:id", authMiddleware, isAdmin, updateCategoria);
router.delete("/:id", authMiddleware, isAdmin, deleteCategoria);
router.get("/:id", getCategoria);
router.get("/", getallCategoria)

module.exports = router;