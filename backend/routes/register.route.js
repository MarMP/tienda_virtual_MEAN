
const express = require('express');
const mongoose = require('mongoose');

const registerRoute = express.Router();
const Usuario = require('../models/Usuario');

const bcrypt = require('bcrypt');


registerRoute.route('/registro').post(async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let salt = await bcrypt.genSalt(12);
    let passHashed = bcrypt.hashSync(req.body.clave, salt);

    usuarioWithHash = { ...req.body, clave: passHashed };


    Usuario.create(usuarioWithHash, (error, data) => {

        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });

});

module.exports = registerRoute;