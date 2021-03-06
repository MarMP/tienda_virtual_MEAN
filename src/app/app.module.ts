import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasService } from './services/categorias.service';
import { UsuariosService } from './services/usuarios.service';
import { ProductosService } from './services/productos.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { LoginModule } from './login/login.module';
import { AuthInterceptorService } from './security/auth-interceptor.service';


export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: " €",
  thousands: ".",
  inputMode: CurrencyMaskInputMode.FINANCIAL
};




@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    DashboardModule,
    MatTooltipModule,
    NgxCurrencyModule,
    LoginModule

  ],
 
  providers: [
    CategoriasService, 
    UsuariosService, 
    ProductosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      //Para que no sea singleton y pueda usarse en todas las llamadas
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
