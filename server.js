const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${server.address().port}`);
});

const Container = require('./container');
const container = new Container();

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/', (req, res) => {
  res.render('form.pug', { msg: 'Add a new product' });
});

app.get('/products', async (req, res) => {
  const products = await container.getAll()
  res.render('products.pug', { title: 'Products', products, items: true});
});


app.post('/', (req, res) => {
  const {
    body
} = req;
  try {
  container.save(body);
  res.send('Product uploaded');
  } catch {
  res.send('Product not saved');
  }
});