const express = require('express');
const pug = require('pug');
const app = express();

const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer("productos.txt");

const MensajesContainer = require('../mensajesChat.js');
const mensajesChat = new MensajesContainer('mensajes.txt');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer);

app.set('view engine', 'pug');
app.set('views', 'public');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//let messages = [];

io.on('connection', async (socket) => {
  //tabla productos
  console.log ("Registrando productos");
  
  socket.on('new-product', nuevoProducto => {
    productos.save(nuevoProducto)
    io.sockets.emit("productos", productos.getAll)
  });

  //mensajes
  socket.emit('messages', await mensajesChat.getMessages());
  socket.on('new-message', async data => {
    console.log("La data es:", data)
    await mensajesChat.save(data);
    io.sockets.emit('messages', await mensajesChat.getMessages());
  })

  // const message = await mensajesChat.getMessages()
  //   socket.emit('messages', message)
  //   socket.on('new-message', async (data) => {
  //       await mensajesChat.save(data)
  //       const message2 = await mensajesChat.getMessages()
  //       io.sockets.emit('messages', message2);
  //  });
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