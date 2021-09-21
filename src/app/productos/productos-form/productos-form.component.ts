import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria';
import { Producto } from 'src/app/models/Producto';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent {
  formGroup = this.fb.group({
    referencia: [null, Validators.required],
    titulo: [null, Validators.required],
    descripcion: [null, Validators.required],
    precio: null,
    categoriaId: [null, Validators.required]
  });

  producto: Producto;
  categorias: Categoria[];

  constructor(private fb: FormBuilder, private productoService: ProductosService, private categoriaService: CategoriasService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.categorias = [];
    this.producto = { referencia: "", titulo: "", descripcion: "", precio: 0, categoriaId: "" };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.limpiarFormulario();
      if (typeof params.id !== "undefined") {
        this.productoService.findProdById(params.id).subscribe(data => {
          if (data._id === params.id) {
            console.log(data);
            this.producto = data;
            console.log(this.producto);
            this.buildForm();
          } else {
            this.router.navigate(["/productos"]);
          }
        })
      }
      this.buildForm();

      this.categoriaService.getCategorias().subscribe(data => {
        this.categorias = data;
      });
    })
  }



  guardar() {
    this.producto = this.formGroup.value;
    console.log(this.producto);

    let req;
    if (this.producto._id) {
      req = this.productoService.updateProducto(this.producto);
      Swal.fire("Producto modificado correctamente");
    } else {
      req = this.productoService.insertProductos(this.producto);
      Swal.fire("Producto insertado correctamente");
    }

    req.subscribe(data => {
      if (typeof data._id !== "undefined") {
        this.router.navigate(["/productos"]);
      } else {
        //alert("error");
        Swal.fire("Se ha producido un error");
      }
    });
  }

  limpiarFormulario() {
    this.formGroup.setValue({
      referencia: "",
      titulo: "",
      descripcion: "",
      precio: 0,
      categoriaId: "",
    });
  }

  buildForm() {
    console.log(this.producto);
    this.formGroup = this.fb.group(this.producto);
  }
}
