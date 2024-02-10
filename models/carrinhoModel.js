const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Certifique-se de que userId é obrigatório
    },
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto", // Certifique-se de que produtoId é obrigatório
    },
    quantidade: {
      type: Number,
      required: true,
    },
    valorBS: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrinho", carrinhoSchema);
