const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pegSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Submetido",
    enum: ["Submetido", "Contactado", "Em andamento", "Resolvido"],
  },
});

//Export the model
module.exports = mongoose.model("Pergunta", pegSchema);
