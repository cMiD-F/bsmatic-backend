const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (user) {
          req.user = user;
          return next();
        } else {
          return res.status(401).json({ message: 'Token não autorizado, faça login como admin' });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token não autorizado, faça login como admin' });
    }
  } else {
    return res.status(401).json({ message: 'Token ausente no cabeçalho' });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "Admin") {
    return res.status(403).json({ message: 'Você não é um administrador' });
  } else {
    return next();
  }
});

module.exports = { authMiddleware, isAdmin };
