const express = require("express");
const {
  createCupom,
  getAllCupons,
  updateCupom,
  deleteCupom,
  getCupom,
} = require("../controller/cupomCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCupom);
router.get("/", authMiddleware, isAdmin, getAllCupons);
router.get("/:id", authMiddleware, isAdmin, getCupom);
router.put("/:id", authMiddleware, isAdmin, updateCupom);
router.delete("/:id", authMiddleware, isAdmin, deleteCupom);

module.exports = router;
