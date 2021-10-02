const Productos = require('../models/Productos');
const categoria = require('../models/Categoria');


let productosCheckSchema = {

    referencia: { 
        isEmpty: { errorMessage: 'La referencia es obligatoria', negated: true },
        custom: {
            options: (value, { req }) => {
                if (req.body._id) return Promise.resolve();
                if (value)
                    return Productos.find({ referencia: value }).then(referencia => {
                        if (referencia.length > 0) {
                            return Promise.reject('Esta referencia ya existe.');
                        }
                    });
            }
        },
        matches: { errorMessage: 'Referencia no válida', options: /^P([0-9]){4}$/i },

    },
    titulo: {
        isEmpty: { errorMessage: 'El titulo es obligatorio', negated: true }, 
    }, 
    precio: {
        isEmpty: { errorMessage: 'El precio es obligatorio', negated: true },
        custom: {
            options: (value) => {
                if (value <= 0) {
                    return Promise.reject("El precio debe ser mayor o igual a 0");
                }

                return Promise.resolve();
            }
        }
    },
    categoriaId: { 
        isEmpty: { errorMessage: 'La categoría es obligatoria', negated: true }
    }

}



module.exports = productosCheckSchema;