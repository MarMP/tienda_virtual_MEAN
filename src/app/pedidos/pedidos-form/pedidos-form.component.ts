import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/es';
import { DetallePedido, Pedido } from 'src/app/models/Pedido';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Producto } from 'src/app/models/Producto';
import { ProductosService } from 'src/app/services/productos.service';
import { MatSelectChange } from '@angular/material/select';
import { Usuario } from 'src/app/models/Usuario';



@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LLLL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
  ]
})
export class PedidosFormComponent {

  pedido!: Pedido;
  formGroup!: FormGroup;
  usuarios: Usuario[];
  user!: Usuario;
  productos: Producto[];
  producto!: Producto;
  referenciaProd: any;
  tituloProd: any;
  precioProd: any;

  constructor(private fb: FormBuilder, private pedidoService: PedidosService, private usuariosService: UsuariosService,
    private productoService: ProductosService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.objetNew();
    this.usuarios = [];
    this.productos = [];
  }
//"2021-09-14T00:00:00.000+00:00"

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.objetNew();
      if (typeof params.id !== "undefined") {
        this.pedidoService.findPedById(params.id).subscribe(data => {
          if (data._id === params.id) {
            //console.log(data);
            this.pedido = data;
            this.buildPedidoForm();
          } else {
            this.router.navigate(["/pedidos"]);
          }
        })
      }
      this.buildPedidoForm();

      //lista de usuarios
      this.usuariosService.getUsuarios().subscribe(data => {
        this.usuarios = data;
        this.usuarios.sort((a, b) => { return a.nombre.localeCompare(b.nombre); })

      });
      //lista de productos
      this.productoService.getProductos().subscribe(data => {
        this.productos = data;
      });
    })

  }

  guardar() {
    this.pedido = this.formGroup.value;
    console.log(this.pedido);

    let req;
    if (this.pedido._id) {
      console.log(this.pedido);
      req = this.pedidoService.updatePedido(this.pedido);
      Swal.fire("El pedido se ha modificado correctamente");
    } else {
      req = this.pedidoService.insertPedido(this.pedido);
      Swal.fire("Pedido insertado correctamente");
    }
    req.subscribe(data => {
      if (typeof data._id !== "undefined") {
        this.router.navigate(["/pedidos"]);
      } else {
        console.log("NO INSERTA");
        Swal.fire("Se ha producido un error");
      }
    });
  }

  /* Gestión para la selección de usuario y su correspondiente dirección */

  selectedUsuario(usuSelected: string) {
    // console.log(event.value);
    //var valorSelectUsu = event.value;
    //this.usuarios = valorSelectUsu;
    this.user = JSON.parse(usuSelected);

    console.log(this.user);
    //para mostrar en el formulario los campos recogidos del select 
    this.pedido.cliente.nombre = this.user.nombre;
    this.pedido.cliente.apellido = this.user.apellido;
    this.pedido.cliente.dni = this.user.dni;
    this.pedido.cliente.email = this.user.email;
    this.pedido.cliente.idUsuario = this.user._id!;

    this.formGroup.get("cliente")?.setValue(this.pedido.cliente);

    //console.log(this.user);
  }

  selectedDir(direccionSelected: string) {
    //console.log(event.value);
    //var valorSelectDir = event.value;
    //this.usuarios = valorSelectDir;
    let dire = JSON.parse(direccionSelected);
    //console.log(dire);

    //para mostrar en el formulario los campos recogidos del select 
    this.pedido.direccionEntrega.calle = dire.calle;
    this.pedido.direccionEntrega.localidad = dire.localidad;
    this.pedido.direccionEntrega.provincia = dire.provincia;
    this.pedido.direccionEntrega.cp = dire.cp;

    this.formGroup.get("direccionEntrega")?.setValue(this.pedido.direccionEntrega);
  }


  /* Selecciona el producto */

  getPedidoDetalleFormArray(): FormArray {
    return (this.formGroup.get("pedidoDetalle") as FormArray);
  }
  createPedidoDetalleItem(detPed: DetallePedido): FormGroup {
    return this.fb.group(detPed);
  }

  delDetallePedido(i: number) {
    this.getPedidoDetalleFormArray().removeAt(i);
  }

  addPedido(ped?: DetallePedido): void {
    if (typeof ped === "undefined") {
      ped = {
        "cantidad": 0,
        "descuento": 0,
        "refProducto": this.referenciaProd,
        "tituloProducto": this.tituloProd,
        "precioUnitario": this.precioProd,
        "precioTotal": 0
      };
    }
    this.getPedidoDetalleFormArray().push(this.createPedidoDetalleItem(ped));
  }


  selectedProduct(productoSelect: string) {
    this.producto = JSON.parse(productoSelect);
    //console.log(this.producto);
    this.referenciaProd = this.producto.referencia;
    this.tituloProd = this.producto.titulo;
    this.precioProd = this.producto.precio;

    // console.log(referenciaProd);

  }

  buildPedidoForm() {
    // FormGroup y los subgrupos para cliente y dirección
    this.formGroup = this.fb.group(this.pedido);
    this.formGroup.setControl("cliente", this.fb.group(this.pedido.cliente));
    this.formGroup.setControl("direccionEntrega", this.fb.group(this.pedido.direccionEntrega));
    this.formGroup.setControl("pedidoDetalle", this.fb.array([]));

    if (this.pedido.pedidoDetalle.length != 0) {
      this.pedido.pedidoDetalle.forEach(ped => {
        this.addPedido(ped);
        //this.objetNew();
      });
    }
  }


  objetNew() {
    this.pedido = {
      numeroPedido: "",
      fecha: new Date(),
      precioTotal: 0,
      cliente: {
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        idUsuario: ""
      },
      direccionEntrega: {
        calle: "",
        localidad: "",
        provincia: "",
        cp: "",
      },
      pedidoDetalle: []
    }
  }

}
