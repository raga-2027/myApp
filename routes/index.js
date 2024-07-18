const express = require('express');
const router = express.Router();
const productsRouter = require('./productsRouter');
const userRouter = require('./userRouter');
const categoriesRouter = require('./categoriesRouter');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', productsRouter);
  router.use('/categories', productsRouter);

}
module.exports = routerApi;
