const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Direccion = new Schema({
    calle: {type: String}, 
    localidad: {type: String}, 
    provincia: {type:String}, 
    cp: {type: Number}
});

let Usuarios = new Schema({
    nombre : { type: String , required: true}, 
    apellido: { type: String }, 
    dni: { type: String, required: true, unique: true, match: /^[0-9]{8}[A-Z]$/i }, 
    email: { type: String, required: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i }, 
    username: { type: String, required: true, unique: true }, 
    clave : { type: String, required: true }, //match: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/i 
    tipoUsuario: { type: String, required: true, enum: ["Administrador", "Cliente"], default: "Cliente" }, 
    direcciones: [Direccion] //array de direcciones

}, { collection: "usuarios" })

module.exports = mongoose.model("Usuarios", Usuarios);
