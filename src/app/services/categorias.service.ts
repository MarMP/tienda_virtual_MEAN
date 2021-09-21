import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  urlBase = "http://localhost:4000/categorias/";


  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertCategoria(categoria: Categoria): Observable<any>{
    console.log("Servicion insertar");
    let url = this.urlBase;
    
    return this.http.post(url, categoria, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log("ERROR PUTO");
          console.log(e); 
          return throwError(e);
        })
      );
  }

  findCatById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }
  
  updateCategoria(categoria: Categoria): Observable<any> {
    let url = this.urlBase+categoria._id;
    delete categoria._id;
    return this.http.put(url, categoria);
  }
  
  delCategoria(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.delete(url);
  }
}


