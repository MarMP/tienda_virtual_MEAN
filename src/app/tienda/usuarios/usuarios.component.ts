import { Component, OnInit } from '@angular/core';
import { UserType, Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  lstUsuario:any;
  textoNombre:string = "Nombre";
  textoApellidos:string = "Apellidos";
  textoDni: string = "DNI";
  textoEmail: string = "email@ejemplo.com";
  textoUsername: string = "user";
  textoClave: string = "clave";
  textoTipoUsuario: string = "admin/user"; 
  textoDirecciones: Array<string> = ["Calle ejemplo"];

  editMode = false;
  userEdit: Usuario =  { nombre: "", apellidos: "", dni:"", email:"", username:"", clave:"", tipoUsuario: UserType.CLIENT, direcciones:[] };
  
  constructor(private usuarioService: UsuariosService) { 
    this.reset();
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.reset();
  }


  loadUsuarios() {
    this.lstUsuario = this.usuarioService.getUsuarios();
  }

  insertUsuario() {
    var usuario = {
      nombre: this.textoNombre,
      apellidos: this.textoApellidos, 
      dni: this.textoDni,
      email: this.textoEmail, 
      username: this.textoUsername, 
      clave: this.textoClave, 
      tipoUsuario: this.textoTipoUsuario, 
      direcciones: this.textoDirecciones
    }
    //this.userEdit = usuario;
    this.save(); 
  }

  edit(id:string) {
    this.usuarioService.findUserById(id).subscribe(data => {
      this.userEdit = data;
      this.editMode = true;
    });
  }

  cancelEdit() {
    this.reset();
  }

  save() {
    let request;
    if(typeof this.userEdit._id !=="undefined") {
      request = this.usuarioService.updateUsuario(this.userEdit);
    } else {
      request = this.usuarioService.insertUsuario(this.userEdit);
    }

    request.subscribe(res => { 
      this.loadUsuarios();
      this.reset();
    });
  }

  delete(id:string) {
    this.usuarioService.delUsuario(id).toPromise().then(res => {
      console.log(res);
      this.loadUsuarios();
    });
  }

  reset() {
    this.editMode = false;
    this.userEdit = {
      nombre: "", 
      apellidos: "", 
      dni:"", email: "", 
      username: "",
      clave: "", 
      tipoUsuario: UserType.CLIENT, 
      direcciones: []};
  }
}
