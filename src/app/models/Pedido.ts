import { Direccion } from "./Usuario";

export interface DetallePedido {
    cantidad: number, 
    descuento: number, 
    refProducto: string, 
    tituloProducto: string, 
    precioUnitario: number, 
    precioTotal: number
}

export interface Cliente {
    nombre: string, 
    apellido: string, 
    dni: string, 
    email: string, 
    idUsuario: string
}

export interface Pedido {
    _id?: string,
    numeroPedido: string, 
    fecha: Date, 
    precioTotal: number, 
    pedidoDetalle: Array<DetallePedido>, 
    cliente: Cliente, 
    direccionEntrega: Direccion

}