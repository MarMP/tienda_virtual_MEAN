import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  lstProductos:any;
  textoReferencia: string =  "ref";
  textoTitulo: string = "titulo";
  textoDescripcion: string = "descripción producto";
  textoPrecio: number = 0;
  textocategoriaId:  string = "categoriaId";

  editMode = false;
  productEdit: Producto =  { referencia: "", titulo: "", descripcion:"", precio: 0, categoriaId:""};

  constructor(private productoService: ProductosService) { 
    this.reset();
  }

  ngOnInit(): void {
    this.loadproductos();
    this.reset();
    
  }

  loadproductos() {
    this.lstProductos = this.productoService.getProductos();
  }

  insertProducto() {
    var producto = {
      referencia: this.textoReferencia,
      titulo: this.textoTitulo,
      descripcion: this.textoDescripcion,
      precio: this.textoPrecio,
      categoriaId: this.textocategoriaId
    }
    this.productEdit = producto;
    this.save(); 
  }

  edit(id:string) {
    this.productoService.findProdById(id).subscribe(data => {
      this.productEdit = data;
      this.editMode = true;
    });
  }

  cancelEdit() {
    this.reset();
  }

  save() {
    let request;
    if(typeof this.productEdit._id !=="undefined") {
      request = this.productoService.updateProducto(this.productEdit);
    } else {
      request = this.productoService.insertProductos(this.productEdit);
    }

    request.subscribe(res => { 
      this.loadproductos();
      this.reset();
    });
  }

  delete(id:string) {
    this.productoService.delProducto(id).toPromise().then(res => {
      console.log(res);
      this.loadproductos();
    });
  }

  reset() {
    this.editMode = false;
    this.productEdit = {
      referencia: "",
      titulo: "",
      descripcion: "",
      precio: 0,
      categoriaId: ""
    };
  }

}
