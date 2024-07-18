const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const app = express();
const port = 3000;
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHander');

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.co'];
const options = {
  origin: (origin, callback) =>{
if(whitelist.includes(origin)){
  callback(null, true);
}else{
  callback(new Error("no permitido"));
}
  }
}
app.use(cors(options));


app.listen(port, () => {
  console.log('Mi port' + port);
});


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


// app.get('/products', (req, res) => {
//   const products = [];
//   const { size } = req.query;
//   const limit = size || 10;
//   for (let index = 0; index < limit; index++){
//     products.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(),10),
//       image: faker.image.imageUrl(),
//     });
//   }
//   res.json(products);
// });

// app.get('/products/filter', (req, res) => {
//   res.send('Yo soy un filter');
// });


// app.get('/products/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//     id,
//     name: 'Product2',
//     price: 2000
//   });
// });


// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     });
//   }else{
//     res.send('No hay parametros');
//   }
// });

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// })

