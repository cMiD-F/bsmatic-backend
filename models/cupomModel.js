const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cupomSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiracao: {
    type: Date,
    required: true,
  },
  desconto: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Cupom", cupomSchema);
