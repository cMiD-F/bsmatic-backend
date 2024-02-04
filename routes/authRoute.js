const express = require("express");
const cors = require("cors");
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
  createOrder,
  getPedidos,
  updateStatusPedidos,
  getTodosPedidos,
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Configuração de CORS específica para essas rotas
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors(corsOptions));

router.post("/registro", createUser);
router.post("/forgot-senha-token", forgotSenhaToken);

router.put("/reset-senha/:token", resetSenha);

router.put("/senha", authMiddleware, updateSenha);
router.post("/login", loginUserController);
router.post("/login-admin", loginAdmin);

// Rotas relacionadas ao carrinho
router.post("/carrinho", authMiddleware, userCarrinho);
router.post("/carrinho/aplicacupom", authMiddleware, aplicaCupom);
router.post("/carrinho/ordem-pagamento", authMiddleware, createOrder);
router.get("/carrinho", authMiddleware, getUserCarrinho);
router.delete("/carrinho-vazio", authMiddleware, emptyCarrinho);


router.get("/todos-usuarios", getallUsers);
router.get("/obtem-pedido", authMiddleware, getPedidos);
router.get("/obtem-todos-pedidos", authMiddleware, isAdmin, getTodosPedidos);
router.post("/obtempedidoporusuario/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/listaDesejo", authMiddleware, getListaDesejo);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/delete-product-cart/:carrinhoItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:carrinhoItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete("/:id", deleteaUser);
router.put("/pedido/atualiza-pedido/:id", authMiddleware, isAdmin, updateStatusPedidos);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/salvar-endereco", authMiddleware, salvaEndereco);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
