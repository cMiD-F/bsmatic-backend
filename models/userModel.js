const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    primeironome: {
      type: String,
      required: true,
    },
    ultimonome: {
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
    endereco: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    carrinho: {
      type: Array,
      default: [],
    },
    
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (senhadigitada) {
  return await bcrypt.compare(senhadigitada, this.senha);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
