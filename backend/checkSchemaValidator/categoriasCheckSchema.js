const Categoria = require('../models/Categoria');

let categoriasCheckSchema = {
    nombre: { isEmpty: { errorMessage: 'El nombre es obligatorio', negated: true }  
    }
}

module.exports = categoriasCheckSchema;