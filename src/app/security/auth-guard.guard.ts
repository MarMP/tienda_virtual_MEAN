import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = sessionStorage.getItem("token");

    if (token) {
      var tokenParse = JSON.parse(token);
      //console.log(tokenParse);
      //console.log(tokenParse.payload.tipoUsuario);
      //Datos del tipo usuario: Cliente o Administrador
      let tipoUser = tokenParse.payload.tipoUsuario;  
      console.log(tipoUser);

      if (tipoUser == "Administrador") {
        console.log("ESTOY AQUI");
        sessionStorage.setItem("user", "Administrador");
      }
      return true;
    }
    return this.router.navigate(["/login"]);


  }

}
