const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dbconfig = require('./database/db');

//conexión a la BBDD
mongoose.Promise = global.Promise;
//parseamos para que no existan problemas con ello
mongoose.connect(dbconfig.db, { useNewUrlParser: true }).then(() => {
    console.log("BBDD conexión correcta!!!");
}, error => {
    console.log(error);
});

//Categorias
const categoriaRoute = require('./routes/categorias.route');
//Usuarios
const usuariosRoute = require('./routes/usuarios.route');
//Productos
const productosRoute = require('./routes/productos.route');
//Pedidos
const pedidosRoute = require('./routes/pedidos.route');

const app = express();
app.use(cors());
app.use(express.json());

//este es el prefijo de las rutas 

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