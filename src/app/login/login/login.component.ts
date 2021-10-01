import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private urlBase = "http://localhost:4000/login/";
  
  loginForm = this.fb.group({
    username: [null, Validators.required],
    clave: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.httpClient.post<any>(this.urlBase, {
      username:this.loginForm.value.username,
      clave:this.loginForm.value.clave
    })  
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(["/home"]);
        console.log(token);
      },
      error => this.onError(error));
  }


  //Gestión de errores 
  private onError(err: any) {
    const ERROR_NOT_FOUND = 404;
    const ERROR_USER_NOT_VALIDATE = 601;

    if (err instanceof HttpErrorResponse) {
      if (err.status == ERROR_NOT_FOUND) {
        alert("Username not found or password invalid");
      } else if (err.status == ERROR_USER_NOT_VALIDATE) {
        alert("Username not found or password invalid");
      } else {
        alert("unknown error");
      }
    }

  }

  //Si el usuario pulsa registrarse, llevará a la pantalla de registro
  public registrarse() {
    this.router.navigate(["registro"])
  }
}
