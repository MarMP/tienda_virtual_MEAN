import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosTableDataSource } from './usuarios-table-datasource';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FiltrosUsuario {
  nombre?: string;
  dni?: string;
}

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

  //Búsqueda
  formBsq!: FormGroup;
  filtros: FiltrosUsuario = {};
  hasFilters: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'apellido', 'dni', 'email', 'direccion', 'username', 'tipoUsuario', 'acciones'];


  constructor(private usuarioService: UsuariosService, private fb: FormBuilder) {
    this.listaUsuarios = [];
    this.dataSource = new UsuariosTableDataSource(this.listaUsuarios);
  }

  ngOnInit(): void {
    this.buildFrmBsq();
  }

  ngAfterViewInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listaUsuarios = data;
      this.initTableData(this.listaUsuarios);
    });
  }

  borrarUsuario(id: string) {
    this.usuarioService.delUsuario(id).subscribe(data => {
      this.listarUsuarios();
    });
    Swal.fire("Usuario eliminado correctamente");
  }

  initTableData(data: Usuario[]) {
    this.dataSource = new UsuariosTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  buildFrmBsq() {
    this.formBsq = this.fb.group({
      nombre: "",
      dni: ""
    });
  }

  filtrar() {
    let filtros = this.formBsq.value;
    console.log(filtros);
    this.filtros = {};

    if (filtros.nombre != "") {
      this.hasFilters = true;
      this.filtros.nombre = filtros.nombre;
    }
    if (filtros.dni != "") {
      this.hasFilters = true;
      this.filtros.dni = filtros.dni;
    }

    console.log(this.filtros);

    let lst = this.listaUsuarios.filter((u) => {
      let coincide = true;

      if (coincide && typeof this.filtros.nombre !== "undefined") {
        coincide = u.nombre.toLowerCase().indexOf(this.filtros.nombre.toLowerCase()) !== -1;
      }

      if (coincide && typeof this.filtros.dni !== "undefined") {
        coincide = u.dni == this.filtros.dni;
      }

      return coincide;
    });

    console.log(lst);
    this.initTableData(lst);
  }


  clearFilters() {
    this.buildFrmBsq();
    this.initTableData(this.listaUsuarios);
  }
}
