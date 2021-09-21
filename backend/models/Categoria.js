const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categoria = new Schema({
    nombre : { type: String }
}, { collection: "categorias" })

module.exports = mongoose.model("Categoria", Categoria);