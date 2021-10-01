const Usuario = require('../models/Usuario');

let usuarioCheckSchema = {

    nombre: { 
        isEmpty: { errorMessage: 'El nombre es obligatorio', negated: true } 
    },

    dni: {
        isEmpty: { errorMessage: 'El dni es obligatorio', negated: true },
        matches: { errorMessage: 'DNI no válido', options: /^[0-9]{8}[A-Z]$/i },
        custom: {
            options: (value, { req }) => {
                console.log(req.body)
                if (req.body._id) return Promise.resolve();
                if (value)
                    return Usuario.find({ dni: value }).then(dni => {
                        if (dni.length > 0) {
                            return Promise.reject('Este DNI ya existe.');
                        }
                    });
            }
        }
    },
    email: {
        isEmpty: { errorMessage: 'El email no puede estar vacío', negated: true },
        isEmail: { errorMessage: 'Email no válido' }
    },

    username: { 
        isEmpty: { errorMessage: 'El username es obligatorio', negated: true },
        custom: {
            options: (value, { req }) => {
                console.log(req.body)
                if (req.body._id) return Promise.resolve();
                if (value)
                    return Usuario.find({ username: value }).then(username => {
                        if (username.length > 0) {
                            return Promise.reject('Este usuario ya existe.');
                        }
                    });
            }
        }
    },
    clave: {
        isEmpty: { errorMessage: 'La clave es obligatoria', negated: true }, 
        matches: { errorMessage: 'Clave no válida: Debe contener al menos 8 caracteres, 1 mayus, 1 minus, 1 num ', options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i },
    }, 
    tipoUsuario: {
        isEmpty: { errorMenssage: 'Tipo de usuario es obligatorio', negated: true }
    }

}

module.exports = usuarioCheckSchema;