import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.css']
})
export class CategoriasFormComponent {
  
  formGroup = this.fb.group({
    nombre: [null, Validators.required]
  });

  item: Categoria;
 
  /* AcivatedRoute en un servicio inyectable que proporciona acceso a información sobre una ruta asociada a un componente, 
  como la ruta de ruta y los parámetros de dirección URL del componente. */

  constructor(private fb: FormBuilder, private categoriaService: CategoriasService, private activateRoute: ActivatedRoute, private router: Router) {
    this.item = {nombre: ""};
    this.limpiarFormulario();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      this.limpiarFormulario();
      if(typeof params.id !== "undefined")  {
        this.categoriaService.findCatById(params.id).subscribe(data => {
          if(data._id === params.id) {
            console.log(data);
            this.item = data;
            console.log(this.item);
            this.buildUserForm();
          } else {
            this.router.navigate(["/categorias"]);
          }
        })
      }

      this.buildUserForm();
    })
  }


  guardar() {
    this.item = this.formGroup.value;
    console.log(this.item);

    let req;
    if (this.item._id) {
      req = this.categoriaService.updateCategoria(this.item);
      Swal.fire("Categoría modificada correctamente");
    } else {
      req = this.categoriaService.insertCategoria(this.item);
      Swal.fire("Categoría insertada correctamente");
    }

    req.subscribe(data => {
      if (typeof data._id !== "undefined") {
        this.router.navigate(["/categorias"]);
      } else {
        Swal.fire("Se ha producido un error");
        //alert("error");

      }
    });
  }

  limpiarFormulario() {
    this.formGroup.setValue({
      nombre:""
    });
  }

  buildUserForm() {
    console.log(this.item);
    this.formGroup = this.fb.group(this.item);
  }

}
