const express = require('express');
const { nextTick } = require('process');
const bcrypt = require('bcrypt');
const app = express();
const usuarioRoute = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const usuarioCheckSchema = require('../checkSchemaValidator/usuarioCheckSchema');

//Modelo de mongoose
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

usuarioRoute.route("/").post(checkSchema(usuarioCheckSchema), async(req, res, next) => {
    console.log("Creamos usuario nuevo");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
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

usuarioRoute.route("/:id").put(checkSchema(usuarioCheckSchema), async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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