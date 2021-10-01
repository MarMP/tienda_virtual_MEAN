const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DetallePedido = new Schema({
    cantidad: { type: Number, min:1, required: true }, 
    descuento: { type: Number, length: {min:0, max: 100}, required: false, default: 0}, 
    refProducto: { type: String, required: true }, 
    tituloProducto: { type: String, required: true }, 
    precioUnitario: { type: Number, min: 0, required: true }, 
    precioTotal: { type: Number, required: true }
});

let Cliente = new Schema({
    nombre: { type: String, required: true }, 
    apellido: { type: String, required: true }, 
    dni: { type: String, required: true }, 
    email: { type: String, required: true }, 
    idUsuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
});

let DireccionEntrega = new Schema({
    calle: { type: String, required: true },  
    localidad: { type: String, required: true },
    provincia: { type: String, required: true }, 
    cp: { type: String, required: true }
});

//Schema de la colección Pedido
let Pedido = new Schema({
    numeroPedido: { type: String, required: true, unique: true }, 
    fecha: { type: Date, default: Date.now() }, 
    precioTotal: { type: Number, min:0, required: true }, 
    pedidoDetalle: [DetallePedido],
    cliente: { required: true, type: Cliente }, 
    direccionEntrega: DireccionEntrega
}, { collection: "pedidos"});


module.exports = mongoose.model("Pedido", Pedido);