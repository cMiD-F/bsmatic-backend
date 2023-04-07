const mongoose = require('mongoose'); // Apague se já for necessário

// Declare o esquema do modelo Mongo
var userSchema = new mongoose.Schema({
    primeiroNome:{
        type:String,
        required:true,
    },
    ultimoNome:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    telefone:{
        type:String,
        required:true,
        unique:true,
    },
    senha:{
        type:String,
        required:true,
    },
});

//Exportar o modelo
module.exports = mongoose.model('User', userSchema);