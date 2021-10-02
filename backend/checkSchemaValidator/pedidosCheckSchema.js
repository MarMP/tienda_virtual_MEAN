const Pedidos = require('../models/Pedido');

let pedidosCheckSchema = {
    numeroPedido: {
        isEmpty: { ErrorMessage: 'El nº de pedido no puede estar vacío', negated: true },
        custom: {
            options: (value, { req }) => {
                console.log(req.body)
                if (req.body._id) return Promise.resolve();
                if (value)
                    return Pedidos.find({ numeroPedido: value }).then(numeroPedido => {
                        if (numeroPedido.length > 0) {
                            return Promise.reject('Nº pedido ya existe.');
                        }
                    });
            }
        },
     /*   customSanitizer: {
            options: async (value, { req }) => {
                const prefijo = "PO";
                if (req.body._id) return value;
                ////último pedido db.pedidos.find().sort({ultimoPedido:-1}).limit(1);
                let pedido = await Pedidos.find().sort({numeroPedido:-1}).limit(1); 

                if (pedido != null) {
                 

                } else {
                    return "PO0001";

                }
            }
        }*/

    }, 

    fecha: {
        isEmpty: { ErrorMessage: 'La fecha no puede ser vacía', negated: true },
        custom: {
            options: (value) => {
                 let fecha = new Date(value);
                        if (fecha > Date.now()) {
                            return Promise.reject('La fecha no puede ser mayor a la actual');
                        }
                        return Promise.resolve();
                }
            }
    },
   precioTotal: {
        isEmpty: { ErrorMessage: 'El precio total no puede estar vacío', negated: true },
        isNumeric: { ErrorMessage: 'El precio debe ser un número', negated: true },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    return Promise.reject('El precio debe ser mayor o igual a 0');
                }
                return Promise.resolve();
            }
        },
        //validación propia para el cálculo del total 
        customSanitizer: {
            options: (value, { req }) => {
                let contadorTotal = 0;
                req.body.pedidoDetalle.forEach(data => {
                    contadorTotal += data.precioTotal;
                })
                return contadorTotal;
            }
        }
    },
    //Falta validación pedido detalle
  
}

module.exports = pedidosCheckSchema;