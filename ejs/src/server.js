const express = require('express');
const ejs = require('ejs');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let form = Boolean(true)

app.get('/', (req, res) => {
  form = true;
  res.render('../views/main.ejs', {form}); 
})

app.get('/productos', (req, res) => {
  form = false;
  const getProductos = productos.getAll();
  res.render('../views/main.ejs', {getProductos, form});
})
app.post('/', async (req, res) => {
  form = true;
  const { nombre, precio, url } = req.body;
  const newProduct = await productos.save(nombre, precio, url);
  res.json('../views/main.ejs', {newProduct, form});
  // const { body } = req;
  // const newProduct = productos.save(body);
  // res.render(newProduct, {form});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});