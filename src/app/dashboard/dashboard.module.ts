import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent, 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ], 
  exports: [
    NavbarComponent
  ]
})
export class DashboardModule { }
