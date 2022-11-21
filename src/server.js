const express = require('express');
const pug = require('pug');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer);

app.set('view engine', 'pug');
app.set('views', 'public');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

let mensajes = [];

io.on('connection', socket => {
  //tabla productos
  console.log ("Registrando productos");
  //socket.emit('nuevosProductos', nuevosProductos);
  
  socket.on('new-product', nuevoProducto => {
    // productos.push(nuevoProducto);
    // io.sockets.emit('nuevosProductos', nuevosProductos);
    productos.save(nuevoProducto)
    io.sockets.emit("productos", productos.getAll)
  });

  //mensajes
  socket.emit('mensajes', mensajes);
  socket.on('new-message', data => {
    mensajes.push(data);
    io.sockets.emit('mensajes', mensajes);
  })
})

app.get('/', (req, res) => {
  res.sendFile('main.pug', { root: __dirname })
  res.render('main.pug'); 
})

app.get('/', async (req, res) => {
  const getProductos = await productos.getAll();
  res.render('main.pug', {getProductos});
})

app.post('/', async (req, res) => {
  const { nombre, precio, url } = req.body;
  await productos.save({nombre, precio, url});
  const getProductos = await productos.getAll();
  res.render('main.pug', {getProductos});
})

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});
server.on('error', error => {
  console.log('Error en servidor', error);
});