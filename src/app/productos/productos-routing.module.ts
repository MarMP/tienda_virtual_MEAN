import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosTableComponent } from './productos-table/productos-table.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  { path: '', component: ProductosTableComponent }, 
  { path: 'nuevo', component: ProductosFormComponent }, 
  { path: 'editar/:id', component: ProductosFormComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
