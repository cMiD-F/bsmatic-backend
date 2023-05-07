const express = require("express");
const {createCupom,  getAllCupons, updateCupom, deleteCupom} = require("../controller/cupomController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCupom);
router.get("/", authMiddleware, isAdmin, getAllCupons);
router.put("/:id", authMiddleware, isAdmin, updateCupom);
router.delete("/:id", authMiddleware, isAdmin, deleteCupom);

module.exports = router;