const express = require('express');
const { nextTick } = require('process');
const app = express();
const pedidosRoute = express.Router();

let Pedido = require('../models/Pedido');
let Usuario = require('../models/Usuario');

//añadimos las rutas
pedidosRoute.route('/').get((req, res) => {
    console.log("Listado de pedidos");

    Pedido.find().exec((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route('/:id').get((req, res, next) => {
    console.log("Listado de pedidos");
    Pedido.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/").post(async(req, res, next) => {
    console.log("Entra en insertar pedido");
    Pedido.create(req.body, (err, data) => {
        if(err) {
            return next(err);
            //res.json(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/:id").put(async(req, res) => {
    Pedido.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

pedidosRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Pedido.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});


module.exports = pedidosRoute;