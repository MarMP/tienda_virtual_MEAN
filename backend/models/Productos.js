const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Productos = new Schema({
    referencia: { type: String, required: true, unique: true, match: /^P([0-9]){4}$/i },
    titulo: { type: String, required: true },
    descripcion: {type:String}, 
    precio: { type: Number, min: 0, required: true },
    categoriaId: { type: Schema.Types.ObjectId, ref: "Categoria", required: true }
}, { collection: "productos"})

module.exports = mongoose.model("Productos", Productos);


//producto.categoria._id