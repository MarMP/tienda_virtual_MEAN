const express = require('express');
const mongoose = require('mongoose');

const loginRoute = express.Router();
const Usuarios = require('../models/Usuario');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

loginRoute.post('/', (req, res, next) => {
  let user = req.body; //{username: "admin", pass: "admin"}
  Usuarios.findOne({ username: user.username }, async (err, resp) => {

    if (user.username != resp.username) {
      res.json({ msg: "Usuario incorrecto" });
    } else {
      if (req.body.clave == resp.clave) {
        let payload = { username: user.username, tipoUsuario: resp.tipoUsuario };
        let token = jwt.sign(payload, config.claveSecreta, { expiresIn: 1440 });
        res.json({ msg: "Autenticación correcta", token: token, payload: payload })
      } else {
        res.json({ msg: "Usuario o contraseña incorrectos." });
      }
    }
  });
});

module.exports = loginRoute;