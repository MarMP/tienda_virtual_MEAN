import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  lstCategoria:any;
  texto:string = "Mi nombre de categoria ";
  edtiMode = false;
  catEdit:Categoria = {nombre: ""};

  constructor(private categoriasService: CategoriasService) {
    this.reset();
   }

  ngOnInit(): void {
    this.loadCategorias();
    this.reset();
  }

  reset() {
    this.edtiMode = false;
    this.catEdit = {nombre: ""};
  }

  loadCategorias() {
    this.lstCategoria = this.categoriasService.getCategorias();
  }

  insertCategoria() {
    var categoria = {
      nombre: this.texto,
    }
    this.catEdit = categoria;
    this.save(); 
    
  }

  edit(id:string) {
    this.categoriasService.findCatById(id).subscribe(data => {
      this.catEdit = data;
      this.edtiMode = true;
    });
  }

  cancelEdit() {
    this.reset();
  }

  save() {
    let request;
    if(typeof this.catEdit._id !=="undefined") {
      request = this.categoriasService.updateCategoria(this.catEdit);
    } else {
      request = this.categoriasService.insertCategoria(this.catEdit); 
    }

    request.subscribe(res => {
      console.log(res); 
      this.loadCategorias();
      this.reset();
    });
  }

  delete(id:string) {
    this.categoriasService.delCategoria(id).toPromise().then(res => {
      console.log(res);
      this.loadCategorias();
    });
  }

}
