import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  /*{ path: '', component: HomeComponent },
  { path: 'categorias', component: CategoriasComponent}, 
  { path: 'usuarios', component: UsuariosComponent}, 
  { path: 'productos', component: ProductosComponent} */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
