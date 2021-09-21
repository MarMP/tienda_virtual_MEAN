import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { TiendaComponent } from './tienda.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    TiendaComponent,
    CategoriasComponent,
    UsuariosComponent,
    ProductosComponent, 
    HomeComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    FormsModule, 
    DashboardModule
  ]
})
export class TiendaModule { }
