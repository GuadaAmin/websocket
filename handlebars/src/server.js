const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let form = Boolean(true)

app.get('/', (req, res) => {
  form = true;
  res.render('form'); 
})

app.get('/productos', (req, res) => {
  form = false;
  const getProductos = productos.getAll();
  res.render('table', {getProductos});
})
app.post('/', (req, res) => {
  form = true;
  const { nombre, precio, url } = req.body;
  const newProduct = productos.save(nombre, precio, url);
  res.render('table', {newProduct});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});
