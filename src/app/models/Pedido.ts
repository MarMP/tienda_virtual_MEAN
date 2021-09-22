import { Direccion } from "./Usuario";

export interface DetallePedido {
    _id?: string,
    cantidad: number, 
    descuento: number, 
    refProducto: string, 
    tituloProducto: string, 
    precioUnitario: number, 
    precioTotal: number
}

export interface Cliente {
    _id?: string,
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
    cliente: Cliente | string, 
    direccionEntrega: Direccion

}