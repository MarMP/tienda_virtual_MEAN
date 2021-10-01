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
        customSanitizer: {
            options: async (value, { req }) => {

                if (req.body._id) return value;
                let ultimoPedido = await Pedidos.findOne({}).sort({ numeroPedido: -1 }).limit(1);

                if (ultimoPedido != null && Object.keys(ultimoPedido).length > 0) {

                    let nPedido = (Number(ultimoPedido.numeroPedido.slice(2, 6)) + 1).toString();
                    let nCeros = 6 - 'PO'.length - nPedido.length

                    let ceros = '';
                    for (i = 0; i < nCeros; i++) {
                        ceros = ceros + '0';
                    }
                    return 'PO' + ceros + nPedido;

                } else {

                    return 'PO0001';

                }
            }
        }

    }, //falta añadir el formato del numero y que sea único

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
    pedidoDetalle: {
        custom: {
            options: (value, { req }) => {
                console.log(req.body.pedidoDetalle);
                precioUnitario = req.body.pedidoDetalle[0].precioUnitario;
                cantidad = req.body.pedidoDetalle[0].cantidad;
                totalCalculado = precioUnitario * cantidad;

                console.log(req.body.pedidoDetalle[0].precioTotal);
                console.log(totalCalculado);

                if (req.body.pedidoDetalle[0].precioTotal == totalCalculado) {
                } else {
                    return Promise.reject("El precio total no se corresponde a la multiplicación del precio unitario por la cantidad");
                }
                return Promise.resolve();
            }
        }
    }
    /*
    'pedidoDetalle.*.cantidad': {
        isEmpty: {
            errorMessage: 'El campo cantidad de cada producto es obligatorio.',
            negated: true,
        },
        isNumeric: {
            errorMessage: 'El campo cantidad debe ser un número.',
        },
        custom: {
            options: (value) => {
                if (value % 1 != 0) {
                    return Promise.reject("La campo cantidad debe ser un número entero.");
                }
                if (value == 0) {
                    return Promise.reject("La cantidad de un producto no puede ser 0.");
                }

                return Promise.resolve();
            }
        }
    },
    'pedidoDetalle.*.descuento': {
        customSanitizer: {
            options: (value) => {
                if (!value) return 0
                else return value
            },
        },
        custom: {
            options: (value) => {
                if (value && typeof value != 'number') {
                    return Promise.reject("El descuento debe ser numérico.");
                }
                if (value < 0 || value > 100) {
                    return Promise.reject("El descuento debe ser una cantidad entre 0 y 100.");
                }

                return Promise.resolve();
            }
        }
    },
    'pedidoDetalle.*.tituloProducto': {
        isEmpty: {
            errorMessage: 'El nombre del producto es obligatorio.',
            negated: true
        }
    },
    'pedidoDetalle.*.precioUnitario': {
        isEmpty: {
            errorMessage: 'El precio unitario de todos los productos es obligatorio.',
            negated: true
        },
        custom: {
            options: (value) => {
                if (value && typeof value != 'number') {
                    return Promise.reject("El precio unitario de cada producto debe ser numérico.");
                }
                if (value <= 0) {
                    return Promise.reject("El precio unitario de cada producto debe ser mayor de 0.");
                }

                return Promise.resolve();
            }
        }
    }, */

}

module.exports = pedidosCheckSchema;