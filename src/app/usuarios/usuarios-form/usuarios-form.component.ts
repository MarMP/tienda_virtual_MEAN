import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direccion, UserType, Usuario } from 'src/app/models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent {
  formGroup = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    dni: [null, Validators.required],
    email: [null, Validators.required],
    username: null,
    clave: [null, Validators.required],
    tipoUsuario: [null, Validators.required],
    direcciones: [null, Validators.required],
  });

  usuario: Usuario;
  userTypesValues = Object.values(UserType);

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private activateRoute: ActivatedRoute, private router: Router) {
    this.usuario = { nombre: "", apellido: "", dni: "", email: "", username: "", clave: "", tipoUsuario: UserType.CLIENT, direcciones: [] }
    this.limpiarFormulario();
  }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      this.limpiarFormulario();
      if (typeof params.id !== "undefined") {
        this.usuarioService.findUserById(params.id).subscribe(data => {
          if (data._id === params.id) {
            console.log(data);
            this.usuario = data;
            console.log(this.usuario);
            this.buildUserForm();
          } else {
            this.router.navigate(["/usuarios"]);
          }
        })
      }

      this.buildUserForm();
    })
  }

  guardar() {
    this.usuario = this.formGroup.value;
    console.log(this.usuario);

    let req;
    if (this.usuario._id) {
      req = this.usuarioService.updateUsuario(this.usuario);
      Swal.fire("Usuario modificado correctamente");
    } else {
      req = this.usuarioService.insertUsuario(this.usuario);
      Swal.fire("Usuario insertado correctamente");
    }

    req.subscribe(data => {
      if (typeof data._id !== "undefined") {
        this.router.navigate(["/usuarios"]);
      } else {
        //alert("error");
        Swal.fire("Se ha producido un error");
      }
    });
  }


  getDireccionesFormArray(): FormArray {
    return (this.formGroup.get("direcciones") as FormArray);
  }
  createDireccionItem(dir: Direccion): FormGroup {
    return this.fb.group(dir);
  }

  addDireccion(dir?: Direccion): void {
    if (typeof dir === "undefined") {
      dir = {
        "calle": "",
        "localidad": "",
        "provincia": "",
        "cp": ""
      };
    }

    this.getDireccionesFormArray().push(this.createDireccionItem(dir));
  }

  delDireccion(i: number) {
    //this.usuario.direcciones.splice(i, 1);
    this.getDireccionesFormArray().removeAt(i);
  }

  limpiarFormulario() {
    this.formGroup.setValue({
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      username: "",
      clave: "",
      tipoUsuario: UserType.CLIENT,
      direcciones: []
    });
  }

  buildUserForm() {
    console.log(this.usuario);
    this.formGroup = this.fb.group(this.usuario);
    this.formGroup.setControl("direcciones", this.fb.array([]));
    if (this.usuario.direcciones.length != 0) {
      this.usuario.direcciones.forEach(dir => {
        this.addDireccion(dir);
      });
    }
  }
}
