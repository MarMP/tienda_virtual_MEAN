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

  registrationForm = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    dni: [null, Validators.required],
    email: [null, Validators.required],
    username: [null, Validators.required],
    clave: [null, Validators.required],
  });

  usuario: Usuario;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.usuario = {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      tipoUsuario: UserType.CLIENT,
      direcciones: [],
      username: '',
      clave :'',
    }
  }
  ngOnInit(): void {

    this.registrationForm = this.fb.group(this.usuario);

    this.registrationForm.get('nombre')?.setValidators(Validators.required);
    this.registrationForm.get('apellido')?.setValidators(Validators.required);
    this.registrationForm.get('dni')?.setValidators(Validators.required);
    this.registrationForm.get('email')?.setValidators(Validators.required);
    this.registrationForm.get('username')?.setValidators(Validators.required);
    this.registrationForm.get('clave')?.setValidators(Validators.required);
  }

  onSubmit(): void {
    this.usuario = this.registrationForm.value;
    this.httpClient.post<any>(this.urlBase, this.usuario)
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
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

  /*public registrar(){
    this.router.navigate(["/login"]);
  } */
}
