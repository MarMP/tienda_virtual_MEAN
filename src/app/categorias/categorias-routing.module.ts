import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasTableComponent } from './categorias-table/categorias-table.component';
import { CategoriasComponent } from './categorias.component';

const routes: Routes = [
  { path: '', component: CategoriasTableComponent },
  { path: 'nueva', component: CategoriasFormComponent},
  { path : 'editar/:id', component: CategoriasFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
