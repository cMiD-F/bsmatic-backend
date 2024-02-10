//pedidosModel.js
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pedidosSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      required: true,
    },
    envioInfo: {
      primeironome: {
        type: String,
        required: true,
      },
      ultimonome: {
        type: String,
        required: true,
      },
      endereco: {
        type: String,
        required: true,
      },
      cidade: {
        type: String,
        required: true,
      },
      estado: {
        type: String,
        required: true,
      },
      outro: {
        type: String,
      },
      cep: {
        type: Number,
        required: true,
      },
    },
    pagamentoInfo: {
      razorpayOrderId: {
        type: String,
        required: true,
      },
      razorpayPaymentId: {
        type: String,
        required: true,
      },
    },
    pedidoItems: [
      {
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto",
          required: true,
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
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    mes: {
      type: Number,
      default: new Date().getMonth(),
    },
    valorTotal: {
      type: Number,
      required: true,
    },
    valorTotalAposDesconto: {
      type: Number,
      required: true,
    },
    pedidoStatus: {
      type: String,
      default: "Ordered",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Pedidos", pedidosSchema);
