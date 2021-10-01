import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Si el usuario es Administrador, podrá tener acceso a todo el menú
  //Si por el contrario el usuario es Cliente, tendrá acceso a todas las partes de menú a excepción de pedidos
  isAdmin(): boolean {
    if (sessionStorage.getItem("user") !== null) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    //window.location.reload();
    this.router.navigate(["/login"]);

  }

}
