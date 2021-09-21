import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosTableComponent } from './pedidos-table/pedidos-table.component';
import { PedidosComponent } from './pedidos.component';

const routes: Routes = [
  { path: '', component: PedidosTableComponent }, 
  { path: 'nuevo', component: PedidosFormComponent},
  { path: 'edit/:id', component: PedidosFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
