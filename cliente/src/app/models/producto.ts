export class Producto{
    id?: number;
    //_id?: number; MONGO
    nombre: string;
    categoria: string;
    ubicacion: string;
    precio: number; 
    imagen: string;

    constructor(nombre: string, categoria: string, ubicacion: string, precio: number, imagen: string){
        this.nombre = nombre;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.imagen = imagen;
    }
}