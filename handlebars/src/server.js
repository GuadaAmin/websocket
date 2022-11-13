const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();
//const router = express.Router()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use('/productos', router)

app.get('/', (req, res) => {
  res.render('../views/form'); 
})

app.get('/productos', (req, res) => {
  const getProductos = productos.getAll();
  res.render('../views/table', {getProductos});
})
app.post('/', (req, res) => {
  const { nombre, precio, url } = req.body;
  const newProduct = productos.save(nombre, precio, url);
  res.render('../views/table', {newProduct});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});