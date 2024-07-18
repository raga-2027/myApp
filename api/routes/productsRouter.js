const express = require('express');
// const faker = require('faker');

const ProdutsService = require('../service/productService');
const validatorHander = require('../middlewares/validatorHander');
const { createproductSchema, updateProductSchema, getProductSchema } = require('../schemas/schemasProduct');

const router = express.Router();

const service = new ProdutsService();

router.get('/', async (req, res) => {

  const products = await service.find();
  // const products = [];
  // const { size } = req.query;
  // const limit = size || 10;
  // for (let index = 0; index < limit; index++) {
  //   products.push({
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price(), 10),
  //     image: faker.image.imageUrl(),
  //   });
  // }
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});


router.get('/:id',
  validatorHander(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const products = await service.findOne(id);
      res.json(products);
    } catch (error) {
      next(error);
    }

    // if (id === '999') {
    //   res.status(404).json({
    //     massage: 'not found',
    //   })
    // } else {
    //   res.status(200).json({
    //     id,
    //     name: 'Product2',
    //     price: 2000
    //   });
    // }
  }
);

router.post('/',
  validatorHander(createproductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newproduct = await service.create(body);
    res.status(201).json(newproduct);
  });

router.patch('/:id',
  validatorHander(getProductSchema, 'params'),
  validatorHander(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    //res.status(404).json({
    //message: error.message
    //});
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);

});

module.exports = router;
