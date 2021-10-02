
const express = require('express');
const mongoose = require('mongoose');

const registerRoute = express.Router();
const Usuario = require('../models/Usuario');
const { checkSchema, validationResult } = require('express-validator');
const usuarioCheckSchema = require('../checkSchemaValidator/usuarioCheckSchema');

const bcrypt = require('bcrypt');


registerRoute.route('/registro').post(checkSchema(usuarioCheckSchema),async (req, res, next) => {
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

module.exports = registerRoute;