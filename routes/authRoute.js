const express = require("express");
const cors = require("cors");
const {
  createUser,
  loginUserCtrl,
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
  getWishlist,
  salvaEndereco,
  userCarrinho,
  getUserCarrinho,
  emptyCarrinho,
  aplicaCupom,
  createPedido,
  getMyPedidos,
  getAllPedidos,
  getsinglePedido,
  updatePedido,
  getMonthWisePedidoIncome,
  getYearlyTotalPedido,

  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
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
router.post("/login", loginUserCtrl);
router.post("/login-admin", loginAdmin);
router.post("/carrinho", authMiddleware, userCarrinho);
router.post("/pedido/checkout", authMiddleware, checkout);
router.post("/pedido/paymentVerification", authMiddleware, paymentVerification);

router.post("/carrinho/cria-pedido", authMiddleware, createPedido);
router.get("/todos-usuarios", getallUsers);
router.get("/getmeuspedidos", authMiddleware, getMyPedidos);
router.get("/gettodospedidos", authMiddleware, isAdmin, getAllPedidos);
router.get("/getPedido/:id", authMiddleware, isAdmin, getsinglePedido);
router.put("/updatePedido/:id", authMiddleware, isAdmin, updatePedido);

router.get("/getMonthWisePedidosIncome", authMiddleware, getMonthWisePedidoIncome);
router.get("/getyearlypedidos", authMiddleware, getYearlyTotalPedido);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/carrinho", authMiddleware, getUserCarrinho);

router.get("/:id", authMiddleware, isAdmin, getaUser);

router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantidade",
  authMiddleware,
  updateProductQuantityFromCart
);

router.delete("/empty-cart", authMiddleware, emptyCarrinho);

router.delete("/:id", deleteaUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/salvar-endereco", authMiddleware, salvaEndereco);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
