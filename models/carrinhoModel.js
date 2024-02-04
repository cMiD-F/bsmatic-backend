const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Certifique-se de que userId é obrigatório
    },
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: true, // Certifique-se de que produtoId é obrigatório
    },
    quantidade: {
      type: Number,
      required: true,
    },
    valorBS: {
      type: Number,
      required: true,
    },
    carrinhoTotal: {
      type: Number,
    },
    totalAfterDiscount: {
      type: Number,
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Certifique-se de que orderby é obrigatório
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrinho", carrinhoSchema);
