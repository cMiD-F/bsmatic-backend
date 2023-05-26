const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var carrinhoSchema = new mongoose.Schema(
  {
    produtos: [
      {
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto",
        },
        contagem: Number,
        codigoTransmissao: String,
        valorBS: Number,
      },
    ],
    carrinhoTotal: Number,
    totalDpsDesconto: Number,
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Carrinho", carrinhoSchema);
