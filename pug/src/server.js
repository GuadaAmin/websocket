const express = require('express');
const pug = require('pug');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('../views/index.pug'); 
})

app.get('/productos', (req, res) => {
  const getProductos = productos.getAll();
  res.render('../views/index.pug', {getProductos});
})
app.post('/', (req, res) => {
  const { nombre, precio, url } = req.body;
  const newProduct = productos.save(nombre, precio, url);
  res.render('../views/index.pug', {newProduct});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});