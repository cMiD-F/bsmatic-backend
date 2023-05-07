const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var produtoSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    marca: {
      type: String,
      required: true,
    },
    transmissao: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    itensInclusos: {
      type: String,
    },
    categoria: {
      type: String,
      required: true,
    },
    valorFornecedor: {
      type: String,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    garantia: {
      type: Number,
    },
    imagens: [],
    classificacao: [
      {
        star: Number,
        comentario: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalclassificacao: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Produto", produtoSchema);
