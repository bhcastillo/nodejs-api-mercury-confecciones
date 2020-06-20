const express = require('express'),
  Product = require('./routes/product'),
  Auth = require('./routes/auth'),
  api = express.Router();

api.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'API confecciones mercury Funcionando',
  });
});
// routes Auth
api.post('/signup', Auth.signUp);
api.post('/signin', Auth.signIn);
// routes Products
api.get('/product/:_id', Product.getProduct);
api.get('/products', Product.getProducts);
api.post('/product/', Product.postProduct);
api.put('/product/:_id', Product.putProduct);
api.delete('/product/:_id', Product.deleteProduct);
api.get('*', Product.notFound);
module.exports = api;
