export interface Direccion {
    _id?: string,
    calle: string,
    localidad: string,
    provincia: string,
    cp: string,
}

export interface Usuario {
    _id?: string,
    nombre: string,   
    apellido: string,
    dni: string, 
    email: string, 
    username: string, 
    clave: string, 
    tipoUsuario:UserType, 
    direcciones: Array<Direccion>,
}

export enum UserType {
    ADMIN = "Administrador",
    CLIENT = "Cliente"
}