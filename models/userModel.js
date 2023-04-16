const mongoose = require("mongoose"); // Apague se já for necessário
const bcrypt = require("bcrypt");

// Declare o esquema do modelo Mongo
var userSchema = new mongoose.Schema(
  {
    primeiroNome: {
      type: String,
      required: true,
    },
    ultimoNome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telefone: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked:{
      type: Boolean,
      default: false,
    },
    carrinho: {
      type: Array,
      default: [],
    },
    endereco: [{type: mongoose.Schema.Types.ObjectId, ref: "Endereco",}],
    ListadeDesejos: [{type: mongoose.Schema.Types.ObjectId, ref: "Produto",}],
    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

userSchema.methods.isPasswordMatched = async function (senhadigitada) {
  return await bcrypt.compare(senhadigitada, this.senha);
};

//Exportar o modelo
module.exports = mongoose.model("User", userSchema);
