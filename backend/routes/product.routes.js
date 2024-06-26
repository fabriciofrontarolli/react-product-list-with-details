const { Router } = require('express');
const productSchema = require('../schemas/product.schema');

const products = [
  {
    id: 1,
    name: 'Playstation 5',
    price: 1000.00,
    description: 'Playstation 5 Slim 1TB'
  }
];

const productRoutes = Router();

/**
 * Gets a list of all products in `products` in-memory array
 */
productRoutes.get('/', (req, res) => {
  const { page = 1, limit = 10, name = '' } = req.query;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  res.send(filteredProducts.slice(startIndex, endIndex));
});

/**
 * Gets a product by ID from the `products` in-memory array
 */
productRoutes.get('/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).send({ message: `Product ID: "${productId}" not found` });
  res.send(product);
});

/**
 * Adds a new product in the `products` in-memory array
 */
productRoutes.post('/', (req, res) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send(error.details);
  }

  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };

  products.push(product);
  res.send(product);
});

module.exports = productRoutes;
