import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidosTableDataSource } from './pedidos-table-datasource';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FiltrosPedido {
  nPedido?: string,
  cliente?: string,
}

@Component({
  selector: 'app-pedidos-table',
  templateUrl: './pedidos-table.component.html',
  styleUrls: ['./pedidos-table.component.css']
})
export class PedidosTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Pedido>;
  dataSource: PedidosTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['numeroPedido', 'cliente', 'dni', 'email', 'direccionEntrega', 'fecha', 'cantidad', 'precioTotal', 'acciones'];
  listaPedidos: Pedido[];

  //Búsqueda de pedidos
  formBsq!: FormGroup;
  filtros: FiltrosPedido = {};
  hasFilters: boolean = false;

  constructor(private pedidoService: PedidosService, private fb: FormBuilder) {
    this.listaPedidos = [];
    this.dataSource = new PedidosTableDataSource(this.listaPedidos);
  }

  ngOnInit(): void {
    this.formularioBusqueda();
  }

  ngAfterViewInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getPedidos().subscribe(data => {
      this.listaPedidos = data;
      this.datosTabla(this.listaPedidos);
    });
  }

  datosTabla(data: Pedido[]) {
    this.dataSource = new PedidosTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  borrarPedido(id: string) {
    this.pedidoService.delPedido(id).subscribe(data => {
      this.listarPedidos();
    });
    Swal.fire("Ususario eliminado");
  }

  formularioBusqueda() {
    this.formBsq = this.fb.group({
      nPedido: "",
      cliente: ""
    });
  }

  filtrar() {
    let filtros = this.formBsq.value;
    console.log(filtros);
    this.filtros = {};

    if (filtros.nPedido != "") {
      this.hasFilters = true;
      this.filtros.nPedido = filtros.nPedido;
    }
    if (filtros.cliente != "") {
      this.hasFilters = true;
      this.filtros.cliente = filtros.cliente;
    }

    console.log(this.filtros);

    let lst = this.listaPedidos.filter((u) => {
      let coincide = true;

      if (coincide && typeof this.filtros.nPedido !== "undefined") {
        coincide = u.numeroPedido.toLowerCase().indexOf(this.filtros.nPedido.toLowerCase()) !== -1;
      }

      if (coincide && typeof this.filtros.cliente !== "undefined") {
        coincide = (u.cliente.nombre + " " + u.cliente.apellido).toLowerCase().indexOf(this.filtros.cliente.toLowerCase()) !== -1;
      }

      return coincide;
    });

    console.log(lst);
    this.datosTabla(lst);
  }

  limpiarRegistrosBusqueda() {
    this.hasFilters = false;
    this.formularioBusqueda();
    this.datosTabla(this.listaPedidos);
  }
}
