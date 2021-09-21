export interface Categoria {
    _id?: string,
    nombre: string,   
}

export interface Producto {
    _id?: string,
    referencia: string, 
    titulo: string,  
    descripcion: string, 
    precio: number, 
    categoriaId: Categoria | string ,
}