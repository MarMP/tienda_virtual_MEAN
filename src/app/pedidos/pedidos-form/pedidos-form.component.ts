import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/es';
import { Cliente } from 'src/app/models/Pedido';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: {
      display: {
        dateInput: 'L',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LLLL',
        monthYearA11yLabel: 'MMMM YYYY',
      }
    }},
  ]
})
export class PedidosFormComponent {
  formGroup = this.fb.group({
    numeroPedido: [null, Validators.required],
    fecha: [null, Validators.required],
    cantidad: [null, Validators.required],
    descuento: [null, Validators.required],
    refProducto: [null, Validators.required],
    tituloProducto: [null, Validators.required],
    precioUnitario: [null, Validators.required],
    cliente: [null, Validators.required],

 
  });

  clientes: Cliente[];

  
  constructor(private fb: FormBuilder, private pedidoService: PedidosService, private usuariosService: UsuariosService,
     private activatedRoute: ActivatedRoute, 
    private router: Router) {
      this.clientes = [];
    }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      //this.limpiarFormulario();
      if (typeof params.id !== "undefined") {
        this.pedidoService.findPedById(params.id).subscribe(data => {
          if (data._id === params.id) {
            console.log(data);
            //this.pedido = data;
            //console.log(this.producto);
            //this.buildForm();
          } else {
            this.router.navigate(["/pedidos"]);
          }
        })
      }
      //this.buildForm();

      this.usuariosService.getUsuarios().subscribe(data => {
        this.clientes = data;
      });
    })
  }

  guardar(){}
  addDireccion(){}
  delDireccion(i: number){}
}
