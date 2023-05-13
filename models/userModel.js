const mongoose = require("mongoose"); // Apague se já for necessário
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
      default: "User",
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
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("senha")){
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (senhadigitada) {
  return await bcrypt.compare(senhadigitada, this.senha);
};

userSchema.methods.createPasswordResetToken = async function() {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
  .createHash("sha256")
  .update(resettoken)
  .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10minutos
  return resettoken;
}

//Exportar o modelo
module.exports = mongoose.model("User", userSchema);
