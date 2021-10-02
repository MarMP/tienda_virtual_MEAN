import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario, UserType } from 'src/app/models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  private urlBase = "http://localhost:4000/registro/";

  formGroup = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    dni: [null, Validators.required],
    email: [null, Validators.required],
    username: [null, Validators.required],
    clave: [null, Validators.required],
  });

  usuario: Usuario;
  userTypesValues = Object.values(UserType);

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.usuario = { nombre: "", apellido: "", dni: "", email: "", username: "", clave: "", tipoUsuario: UserType.CLIENT, direcciones: [] }
  }
 
  onSubmit(): void {
    this.httpClient.post<any>(this.urlBase, {
      nombre: this.formGroup.value.nombre, 
      apellido: this.formGroup.value.apellido, 
      dni: this.formGroup.value.dni, 
      email: this.formGroup.value.email, 
      username: this.formGroup.value.username, 
      clave: this.formGroup.value.clave,
      tipoUsuario: UserType.CLIENT,
      direcciones: [],
    })
    .subscribe(data => {
        this.router.navigate(["/login"]);
      },
      error => this.onError(error));
  }

    //Gestión de errores 
    private onError(err: any) {
      const ERROR_EMPTY_RESPONSE = 204;
      const ERROR_EMAIL_EXISTS = 409;
      
      if (err instanceof HttpErrorResponse) {
        if (err.status == ERROR_EMAIL_EXISTS) {
          alert("Email already exist");
        } else {
          alert("unknown error");
        }
      }
  
    }

  public cancelar(){
    this.router.navigate(["/login"]);
  } 
}
