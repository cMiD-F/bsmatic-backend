const User = require("../models/userModel");
const Produto = require("../models/produtoModel");
const Carrinho = require("../models/carrinhoModel");
const Cupom = require("../models/cupomModel");
const Pedido = require("../models/pedidosModel");
const uniqid = require("uniqid");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const { log } = require("console");

// Create a User ----------------------------------------------

const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO:Get the email from req.body
   */
  const email = req.body.email;
  /**
   * TODO:With the help of email find the user exists or not
   */
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    /**
     * TODO:if user not found user create a new user
     */
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    /**
     * TODO:if user found then thow an error: User already exists
     */
    throw new Error("Usuário já existe");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(senha))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser._id,
      primeironome: findUser.primeironome,
      ultimonome: findUser.ultimonome,
      email: findUser.email,
      telefone: findUser.telefone,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Credenciais inválidas");
  }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Usuário não autorizado!");
  if (findAdmin && (await findAdmin.isPasswordMatched(senha))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin._id,
      primeironome: findAdmin.primeironome,
      ultimonome: findAdmin.ultimonome,
      email: findAdmin.email,
      telefone: findAdmin.telefone,
      token: generateToken(findAdmin._id),
    });
  } else {
    throw new Error("Credenciais inválidas");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
    throw new Error("Nenhum token de atualização em cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error(
        "Nenhum token de atualização presente no banco de dados ou não correspondido"
      );
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        primeironome: req?.body?.primeironome,
        ultimonome: req?.body?.ultimonome,
        email: req?.body?.email,
        telefone: req?.body?.telefone,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// salvar endereço do usuário
const salvaEndereco = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        endereco: req?.body?.endereco,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users
const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateSenha = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { senha } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (senha) {
    user.senha = senha;
    const updatedSenha = await user.save();
    res.json(updatedSenha);
  } else {
    res.json(user);
  }
});

const forgotSenhaToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuário não encontrado com este e-mail");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    console.log(token);
    const resetURL = `Olá, siga este link para redefinir sua senha. Este link é válido até 10 minutos a partir de agora. <a href='http://localhost:5000/api/user/reset-senha/${token}'>Click Here</>`;

    const data = {
      to: email,
      text: "Ei usuário",
      subject: "Link para trocar senha",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetSenha = asyncHandler(async (req, res) => {
  const { senha } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expirado, tente novamente mais tarde");
  user.password = senha;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCarrinho = asyncHandler(async (req, res) => {
  const { produtoId, quantidade, valorBS } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCarrinho = await new Carrinho({
      userId: _id,
      produtoId,
      quantidade,
      valorBS,
      // orderby: _id, // Adicionando o valor de _id ao campo orderby
    }).save();
    res.json(newCarrinho);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCarrinho = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const carrinho = await Carrinho.find({ userId: _id }).populate("produtoId");
    res.json(carrinho);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  console.log(cartItemId);
  validateMongoDbId(_id);
  try {
    const deleteProductFromCart = await Carrinho.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCarrinho = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deleteCart = await Carrinho.deleteMany({
      userId: _id,
    });
    res.json(deleteCart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantidade } = req.params;
  validateMongoDbId(_id);
  try {
    const cartItem = await Carrinho.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantidade = newQuantidade;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const aplicaCupom = asyncHandler(async (req, res) => {
  const { cupom } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCupom = await Cupom.findOne({ nome: cupom });
  if (validCupom === null) {
    throw new Error("Cupom Inválido");
  }
  const user = await User.findOne({ _id });
  let { carrinhoTotal } = await Carrinho.findOne({
    orderby: user._id,
  }).populate("produtos.produto");
  let totalDpsDesconto = (
    carrinhoTotal -
    (carrinhoTotal * validCupom.desconto) / 100
  ).toFixed(2);
  await Carrinho.findOneAndUpdate(
    { orderby: user._id },
    { totalDpsDesconto },
    { new: true }
  );
  res.json(totalDpsDesconto);
});

const createPedido = asyncHandler(async (req, res) => {
  const {
    envioInfo,
    pedidoItems,
    valorTotal,
    valorTotalAposDesconto,
    pagamentoInfo,
  } = req.body;
  const { _id } = req.user;
  try {
    const pedido = await Pedido.create({
      envioInfo,
      pedidoItems,
      valorTotal,
      valorTotalAposDesconto,
      pagamentoInfo,
      user: _id,
    });
    res.json({ pedido, success: true });
  } catch (error) {
    throw new Error(error);
  }
});

const getMyPedidos = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const pedidos = await Pedido.find({ user: _id })
      .populate("user")
      .populate("pedidoItems.produto");
    res.json({
      pedidos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPedidos = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const pedidos = await Pedido.find().populate("user");
    // .populate("orderby")
    // .exec();
    res.json({
      pedidos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getsinglePedido = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const pedidos = await Pedido.findOne({ _id: id })
      .populate("user")
      .populate("pedidoItems.produto");
    res.json({
      pedidos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePedido = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const pedidos = await Pedido.findById(id);
    pedidos.pedidoStatus = req.body.status;
    await pedidos.save();
    res.json({
      pedidos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthWisePedidoIncome = asyncHandler(async (req, res) => {
  let nomeMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let d = new Date();
  let fimData = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1); // vai para o proximo mes
    fimData = nomeMeses[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Pedido.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(fimData),
        },
      },
    },
    {
      $group: {
        _id: {
          mes: "$month",
        },
        quantia: { $sum: "$valorTotalAposDesconto" },
        contar: { $sum: 1 },
      },
    },
  ]);
  res.json(data);
});

const getYearlyTotalPedido = asyncHandler(async (req, res) => {
  let nomeMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let d = new Date();
  let fimData = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() -1);
    fimData = nomeMeses[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Pedido.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(fimData),
        },
      },
    },
    {
      $group: {
        _id: null,
        quantia: { $sum: 1 },
        quantia: { $sum: "$valorTotalAposDesconto" },
        contar: { $sum: 1 },
      },
    },
  ]);
  res.json(data);
});

module.exports = {
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
};
