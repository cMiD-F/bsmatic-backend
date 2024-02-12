const express = require("express");
const {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getallApplication,
} = require("../controller/applicationCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createApplication);
router.put("/:id", authMiddleware, isAdmin, updateApplication);
router.delete("/:id", authMiddleware, isAdmin, deleteApplication);
router.get("/:id", getApplication);
router.get("/", getallApplication);

module.exports = router;
