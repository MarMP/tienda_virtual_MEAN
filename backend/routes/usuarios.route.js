const express = require('express');
const { nextTick } = require('process');
const bcrypt = require('bcrypt');
const app = express();
const usuarioRoute = express.Router();

//load del modelo de mongoose
let Usuario = require('../models/Usuario');

//añadimos las rutas
usuarioRoute.route('/').get((req, res) => {
    console.log("Listado de usuarios");

    Usuario.find((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
})

usuarioRoute.route('/:id').get((req, res) => {
    console.log("Listado de usuarios");

    Usuario.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

usuarioRoute.route("/").post(async(req, res) => {
    console.log("Creamos usuario nuevo");
    let salt = await bcrypt.genSalt(12);
    req.body.clave = bcrypt.hashSync(req.body.clave, salt);

    Usuario.create(req.body, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
});

usuarioRoute.route("/:id").put(async(req, res) => {
    //Si en angular no se modifica la clave, no la manadamos
    if(typeof req.body.clave !== "undefined") {
        let salt = await bcrypt.genSalt(12);
        req.body.clave = bcrypt.hashSync(req.body.clave, salt);
    }
    Usuario.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});

usuarioRoute.route("/:id").delete((req, res) => {
    console.log("Delete "+ req.params.id);
    Usuario.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.json(data);
        }
    });
});


module.exports = usuarioRoute;