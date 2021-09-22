import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlBase = "http://localhost:4000/pedidos/";

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertPedido(pedido: Pedido): Observable<any>{
    console.log("Servicio insertar");
    let url = this.urlBase;
    
    return this.http.post(url, pedido, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log(e); 
          return throwError(e);
        })
      );
  }

  findPedById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }
  
  updatePedido(pedido: Pedido): Observable<any> {
    let url = this.urlBase+pedido._id;
    delete pedido._id;
    return this.http.put(url, pedido);
  }
  
  delPedido(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.delete(url);
  }
}
