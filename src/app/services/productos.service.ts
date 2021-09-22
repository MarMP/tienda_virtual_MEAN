import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../models/Producto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  urlBase = "http://localhost:4000/productos/";


  getProductos(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertProductos(producto: Producto): Observable<any>{
    console.log("Servicio insertar");
    let url = this.urlBase;
    
    return this.http.post(url, producto, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log("ERROR en insert");
          console.log(e); 
          return throwError(e);
        })
      );
  }

  findProdById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }
  
  updateProducto(producto: Producto): Observable<any> {
    let url = this.urlBase+producto._id;
    delete producto._id;
    return this.http.put(url, producto);
  }
  
  delProducto(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.delete(url);
  }
}
