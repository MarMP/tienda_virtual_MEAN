import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CategoriasTableDataSource } from './categorias-table-datasource';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-table',
  templateUrl: './categorias-table.component.html',
  styleUrls: ['./categorias-table.component.css']
})
export class CategoriasTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Categoria>;
  dataSource: CategoriasTableDataSource;

  listaCategoria: Categoria[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'acciones'];

  constructor(private categoriaService: CategoriasService) {
    this.listaCategoria = [];
    this.dataSource = new CategoriasTableDataSource(this.listaCategoria);

  }

  ngAfterViewInit(): void {
    this.listarCategoria();
  }

  listarCategoria() {
    this.categoriaService.getCategorias().subscribe(data => {
      console.log(data);
      this.listaCategoria = data;
      this.dataSource = new CategoriasTableDataSource(this.listaCategoria);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  borrarCategoria(id: string) {
    this.categoriaService.delCategoria(id).subscribe(data => {
      this.listarCategoria();
    });
    Swal.fire("Se ha eliminado la categoría");
  }
}
