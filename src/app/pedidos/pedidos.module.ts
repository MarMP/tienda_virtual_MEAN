import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { PedidosTableComponent } from './pedidos-table/pedidos-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    PedidosComponent,
    PedidosFormComponent,
    PedidosTableComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    DashboardModule, 
    MatIconModule, 
    MatDatepickerModule,
    MomentDateModule,
    MatAutocompleteModule,
    MatTooltipModule


  ]
})
export class PedidosModule { }
