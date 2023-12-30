const mongoose = require("mongoose");

const carrinhoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto"
    },
    quantidade: {
      type: Number,
      required: true
    },
    valorBS: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrinho", carrinhoSchema);
