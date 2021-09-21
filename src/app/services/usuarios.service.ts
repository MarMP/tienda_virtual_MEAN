import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase = "http://localhost:4000/usuarios/";

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  }

  insertUsuario(usuario: Usuario): Observable<any>{
    let url = this.urlBase;
    
    return this.http.post(url, usuario, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log(e); 
          return throwError(e);
        })
      );
  }

  findCatById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }
  
  updateUsuario(usuario: Usuario): Observable<any> {
    let url = this.urlBase+usuario._id;
    delete usuario._id;
    return this.http.put(url, usuario);
  }
  
  delUsuario(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.delete(url);
  }

}

