const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Direccion = new Schema({
    calle: {type: String}, 
    localidad: {type: String}, 
    provincia: {type:String}, 
    cp: {type: Number}
});

let Usuarios = new Schema({
    nombre : { type: String }, 
    apellido: { type: String }, 
    dni: { type: String }, 
    email: { type: String }, 
    username: { type: String, required: true, unique: true }, 
    clave : { type: String, required: true }, 
    tipoUsuario: { type: String, enum: ["Administrador", "Cliente"], default: "Cliente", required: true }, 
    direcciones: [Direccion] //array de direcciones

}, { collection: "usuarios" })

module.exports = mongoose.model("Usuarios", Usuarios);
