const express = require('express');
const pug = require('pug');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let form = Boolean(true)

app.get('/', (req, res) => {
  form = true;
  res.render('../views/main.pug', {form}); 
})

app.get('/productos', (req, res) => {
  form = false;
  const getProductos = productos.getAll();
  res.render('../views/main.pug', {getProductos, form});
})
app.post('/', (req, res) => {
  form = true;
  // const { nombre, precio, url } = req.body;
  // const newProduct = productos.save(nombre, precio, url);
  // res.json({newProduct});
  // res.render('../views/main.pug', {form})
  const { body } = req;
  const newProduct = productos.save(body);
  res.json(newProduct, {form});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});