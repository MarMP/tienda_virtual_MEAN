const express = require('express');
const { nextTick } = require('process');
const app = express();
const productosRoute = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const productosCheckSchema = require('../checkSchemaValidator/productosCheckSchema');

let Productos = require('../models/Productos');
let Categoria = require('../models/Categoria');

//añadimos las rutas
productosRoute.route('/').get((req, res) => {
    console.log("Listado de productos");

    Productos.find().populate("categoriaId").exec((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productosRoute.route('/:id').get((req, res) => {
    console.log("Listado de productos");
    Productos.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productosRoute.route("/").post(checkSchema(productosCheckSchema), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Productos.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productosRoute.route("/:id").put(checkSchema(productosCheckSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Productos.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productosRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Productos.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});


module.exports = productosRoute;





