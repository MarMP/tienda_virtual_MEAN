import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Producto } from 'src/app/models/Producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosTableDataSource } from './productos-table-datasource';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos-table',
  templateUrl: './productos-table.component.html',
  styleUrls: ['./productos-table.component.css']
})
export class ProductosTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Producto>;
  dataSource: ProductosTableDataSource;

  listaProductos: Producto[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'referencia', 'titulo', 'descripcion', 'precio', 'categoriaId', 'acciones' ];

  constructor(private productoService: ProductosService) {
    this.listaProductos = [];
    this.dataSource = new ProductosTableDataSource(this.listaProductos);
  }


  ngAfterViewInit(): void {
    this.listarProductos();
 
  }

  listarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.listaProductos = data;
      this.dataSource = new ProductosTableDataSource(this.listaProductos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  borrarProducto(id: string) {
    this.productoService.delProducto(id).subscribe(data => {
      this.listarProductos();
    });
    Swal.fire("Ususario eliminado");

  }
}
