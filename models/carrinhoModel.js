const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumindo que você tem um modelo de usuário chamado Usuario
    },
    produtos: [
      {
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto", // Assumindo que você tem um modelo de produto chamado Produto
        },
        quantidade: {
          type: Number,
          required: true,
          default: 1,
        },
        valorBS: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrinho", carrinhoSchema);
