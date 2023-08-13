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
    codigoTransmissao: {
      type: String,
      required: true,
    },
    itensInclusos: {
      type: String,
    },
    valorBS: {
      type: Number,
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
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    aplicacao: [],
    tags: String,
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
