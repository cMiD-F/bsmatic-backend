const express = require("express");
const {
  createUser,
  loginUserController,
  getallUsers,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
} = require("../controller/userController");

const { authMiddleware, isAdmin } = require("..//middlewares/authMiddleware");
const router = express.Router();

router.post("/registro", createUser);
router.post("/login", loginUserController);
router.get("/todos-usuarios", getallUsers);
router.get ("/refresh", handleRefreshToken);
router.get("/logout", logout);


router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware,isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin, unblockUser);


module.exports = router;
