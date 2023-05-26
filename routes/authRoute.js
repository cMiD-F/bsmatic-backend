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
  updateSenha,
  forgotSenhaToken,
  resetSenha,
  loginAdmin,
  getListaDesejo,
  salvaEndereco,
  userCarrinho,
  getUserCarrinho,
  emptyCarrinho,
  aplicaCupom,
} = require("../controller/userController");

const { authMiddleware, isAdmin } = require("..//middlewares/authMiddleware");
const router = express.Router();

router.post("/registro", createUser);
router.post("/forgot-senha-token", forgotSenhaToken);
router.put("/reset-senha/:token", resetSenha);

router.put("/senha", authMiddleware, updateSenha);
router.post("/login", loginUserController);
router.post("/carrinho", authMiddleware, userCarrinho);
router.post("/carrinho/aplicacupom", authMiddleware, aplicaCupom);
router.post("/login-admin", loginAdmin);
router.get("/todos-usuarios", getallUsers);
router.get ("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/listaDesejo", authMiddleware, getListaDesejo);
router.get("/carrinho", authMiddleware, getUserCarrinho);


router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/carrinho-vazio", authMiddleware, emptyCarrinho);
router.delete("/:id", deleteaUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/salvar-endereco", authMiddleware, salvaEndereco);
router.put("/block-user/:id", authMiddleware,isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin, unblockUser);


module.exports = router;
