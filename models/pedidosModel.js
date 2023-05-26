const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pedidosSchema = new mongoose.Schema(
  {
    produtos: [
      {
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto",
        },
        contagem: Number,
        codigoTransmissao: String,
      },
    ],
    acompPagemento: {},
    pedidoStatus: {
      type: String,
      default: "Não processado",
      enum: [
        "Não Processado",
        "Pagamento Confirmado",
        "Processando",
        "Enviado",
        "Cancelado",
        "Entregue",
      ],
    },
    orderby: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Pedidos", pedidosSchema);
