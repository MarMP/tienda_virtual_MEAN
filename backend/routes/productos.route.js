const express = require('express');
const { nextTick } = require('process');
const app = express();
const productosRoute = express.Router();

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

productosRoute.route("/").post((req, res) => {
    Productos.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

productosRoute.route("/:id").put((req, res) => {
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





