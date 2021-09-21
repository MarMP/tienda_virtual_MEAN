import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosTableDataSource } from './usuarios-table-datasource';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.css']
})
export class UsuariosTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Usuario>;
  dataSource: UsuariosTableDataSource;

  listaUsuarios: Usuario[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'dni', 'email', 'username', 'tipoUsuario', 'acciones'];


  constructor(private usuarioService: UsuariosService) {
    this.listaUsuarios = [];
    this.dataSource = new UsuariosTableDataSource(this.listaUsuarios);
  }

  ngAfterViewInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listaUsuarios = data;
      this.dataSource = new UsuariosTableDataSource(this.listaUsuarios);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  borrarUsuario(id: string) {
    this.usuarioService.delUsuario(id).subscribe(data => {
      this.listarUsuarios();
    });
    Swal.fire("Usuario eliminado correctamente");
  }
}
