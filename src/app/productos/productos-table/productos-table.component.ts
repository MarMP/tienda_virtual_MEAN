import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Categoria, Producto } from 'src/app/models/Producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosTableDataSource } from './productos-table-datasource';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';

export interface FiltrosProducto {
  ref?: string,
  titulo?: string,
  categoriaId?: string,
  precioDesde?: number,
  precioHasta?: number,
}

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
  listaCategorias: Categoria[];

  //Búsqueda de producto
  formBsq!: FormGroup;
  filtros: FiltrosProducto = {};
  hasFilters: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['referencia', 'titulo', 'descripcion', 'precio', 'categoriaId', 'acciones'];

  constructor(private productoService: ProductosService, private fb: FormBuilder, private categoriaService: CategoriasService) {
    this.listaProductos = [];
    this.listaCategorias = [];
    this.dataSource = new ProductosTableDataSource(this.listaProductos);
  }

  ngOnInit(): void {
    this.buildFrmBsq();
    this.categoriaService.getCategorias().subscribe(data => {
      this.listaCategorias = data;
    });
  }

  ngAfterViewInit(): void {
    this.listarProductos();

  }

  listarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.listaProductos = data;
      this.initTableData(this.listaProductos);
    });
  }

  initTableData(data: Producto[]) {
    this.dataSource = new ProductosTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  borrarProducto(id: string) {
    this.productoService.delProducto(id).subscribe(data => {
      this.listarProductos();
    });
    Swal.fire("Ususario eliminado");
  }

  buildFrmBsq() {
    this.formBsq = this.fb.group({
      ref: "",
      titulo: "",
      categoria: "",
      precioDesde: undefined,
      precioHasta: undefined
    });
  }

  filtrar() {
    let filtros = this.formBsq.value;
    console.log(filtros);
    this.filtros = {};

    if (filtros.ref != "") {
      this.hasFilters = true;
      this.filtros.ref = filtros.ref;
    }
    if (filtros.titulo != "") {
      this.hasFilters = true;
      this.filtros.titulo = filtros.titulo;
    }
    if (filtros.categoria != "") {
      this.hasFilters = true;
      this.filtros.categoriaId = filtros.categoria;
    }
    if (filtros.precioDesde != null) {
      this.hasFilters = true;
      this.filtros.precioDesde = filtros.precioDesde;
    }
    if (filtros.precioHasta != null) {
      this.hasFilters = true;
      this.filtros.precioHasta = filtros.precioHasta;
    }

    console.log(this.filtros);

    let lst = this.listaProductos.filter((u) => {
      let coincide = true;

      if (coincide && typeof this.filtros.ref !== "undefined") {
        coincide = u.referencia.toLowerCase().indexOf(this.filtros.ref.toLowerCase()) !== -1;
      }

      if (coincide && typeof this.filtros.titulo !== "undefined") {
        coincide = u.titulo.toLowerCase().indexOf(this.filtros.titulo.toLowerCase()) !== -1;
      }

      if (coincide && typeof this.filtros.categoriaId !== "undefined") {
        coincide = (typeof u.categoriaId === "object" ? (u.categoriaId as Categoria)._id : u.categoriaId) == this.filtros.categoriaId;
      }

      if (coincide && typeof this.filtros.precioDesde !== "undefined" && this.filtros.precioDesde !== null) {
        coincide = u.precio >= this.filtros.precioDesde;
      }
      if (coincide && typeof this.filtros.precioHasta !== "undefined" && this.filtros.precioHasta !== null) {
        coincide = u.precio <= this.filtros.precioHasta;
      }

      return coincide;
    });

    console.log(lst);
    this.initTableData(lst);
  }

  clearFilters() {
    this.hasFilters = false;
    this.buildFrmBsq();
    this.initTableData(this.listaProductos);
  }

}
