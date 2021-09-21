const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Productos = new Schema({
    referencia: {type: String},
    titulo: {type: String},
    descripcion: {type:String}, 
    precio: {type:Number},
    categoriaId: { type: Schema.Types.ObjectId, ref: "Categoria"}
}, { collection: "productos"})

module.exports = mongoose.model("Productos", Productos);


//producto.categoria._id