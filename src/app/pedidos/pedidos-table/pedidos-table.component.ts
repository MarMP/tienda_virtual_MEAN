import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidosTableDataSource } from './pedidos-table-datasource';
import Swal from 'sweetalert2';

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
  displayedColumns = ['id', 'numeroPedido', 'cliente' , 'fecha', 'tituloProducto', 'cantidad', 'precioTotal', 'acciones' ];
  listaPedidos: Pedido[];

  constructor(private pedidoService: PedidosService) {
    this.listaPedidos = [];
    this.dataSource = new PedidosTableDataSource(this.listaPedidos);
  }

  ngAfterViewInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getPedidos().subscribe(data => {
      this.listaPedidos = data;
      this.dataSource = new PedidosTableDataSource(this.listaPedidos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  borrarPedido(id: string) {
    this.pedidoService.delPedido(id).subscribe(data => {
      this.listarPedidos();
    });
    Swal.fire("Ususario eliminado");
  }
}
