const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DetallePedido = new Schema({
    cantidad: { type: Number }, 
    descuento: { type: Number }, 
    refProducto: { type: String }, 
    tituloProducto: { type: String }, 
    precioUnitario: { type: Number }, 
    precioTotal: { type: Number }
});

let Cliente = new Schema({
    nombre: { type: String }, 
    apellido: { type: String }, 
    dni: { type: String }, 
    email: { type: String }, 
    idUsuario: { type: Schema.Types.ObjectId, ref: "Usuario"}
});

let DireccionEntrega = new Schema({
    calle: { type: String },  
    localidad: { type: String },
    provincia: { type: String }, 
    cp: { type: String }
});

//Schema de la colección Pedido
let Pedido = new Schema({
    numeroPedido: { type: String, unique: true }, 
    fecha: { type: Date }, 
    precioTotal: { type: Number }, 
    pedidoDetalle: [DetallePedido],
    cliente: Cliente, 
    direccionEntrega: DireccionEntrega
}, { collection: "pedidos"});


module.exports = mongoose.model("Pedido", Pedido);