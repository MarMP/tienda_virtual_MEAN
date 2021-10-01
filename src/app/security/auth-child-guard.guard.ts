import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuardGuard implements CanActivateChild {

  constructor(private router: Router, private http: HttpClient) {

  }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.http.get("http://localhost:4000/login").pipe(map(data => {
      let aux: any = data;
      if (aux.msg == "Token válido") {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
      return true;
      //console.log("adfasdf");
    }));

    let token = sessionStorage.getItem("token");
    if (token != null) {
      return true;
    }
    return this.router.navigate(["/login"]);

  }

}
