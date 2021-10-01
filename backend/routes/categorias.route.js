const express = require('express');
const { nextTick } = require('process');
const app = express();
const categoriaRoute = express.Router();
let Categoria = require('../models/Categoria');
const { checkSchema, validationResult } = require('express-validator');
const categoriasCheckSchema = require('../checkSchemaValidator/categoriasCheckSchema');




//añadimos las rutas
categoriaRoute.route('/').get((req, res) => {
    console.log("Listado de categorias");

    Categoria.find((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route('/:id').get((req, res) => {
    console.log("Listado de categorias");

    Categoria.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route("/").post(checkSchema(categoriasCheckSchema),async(req, res, next) => {
    //gestión para las validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Categoria.create(req.body, (err, data) => {
        if(err) {
            return next(err);

        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route("/:id").put(checkSchema(categoriasCheckSchema), async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Categoria.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

categoriaRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Categoria.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});


module.exports = categoriaRoute;