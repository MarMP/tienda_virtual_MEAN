const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Para el token
const jwt = require('jsonwebtoken');
const configs = require('./config/config');

const dbconfig = require('./database/db');

//conexión a la BBDD
mongoose.Promise = global.Promise;
//parseamos para que no existan problemas con ello
mongoose.connect(dbconfig.db, { useNewUrlParser: true }).then(() => {
    console.log("BBDD conexión correcta!!!");
}, error => {
    console.log(error);
});

//Login
const loginRoute = require('./routes/login.route');
//Registro
const registroRoute = require('./routes/register.route');
//Categorias
const categoriaRoute = require('./routes/categorias.route');
//Usuarios
const usuariosRoute = require('./routes/usuarios.route');
//Productos
const productosRoute = require('./routes/productos.route');
//Pedidos
const pedidosRoute = require('./routes/pedidos.route');
//Autorization 
const authorization = require('./routes/authorization');

const app = express();
app.use(cors());
app.use(express.json());

//Prefijo de las rutas 

//Login
app.use("/login", loginRoute);
//Registro
app.use("/registro", registroRoute);

//Autorización middleware
app.use(authorization());


//categorias
app.use("/categorias", categoriaRoute);
//usuarios
app.use("/usuarios", usuariosRoute);
//productos 
app.use("/productos", productosRoute);
//Pedidos
app.use("/pedidos", pedidosRoute);


app.get('/', (req, res) => {
    console.log("Holaaa estamos en /");
    res.send("Hello world!!!!!!!!!!!");
});


const port = 4000;
const server = app.listen(port, () => {
    console.log('Servidor escuchando en el puerto --> '+ port);
})