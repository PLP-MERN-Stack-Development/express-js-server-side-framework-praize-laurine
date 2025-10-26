const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory products data
let products = [
  { id: '1', name: 'Laptop', description: '16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: '128GB Storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable Timer', price: 50, category: 'kitchen', inStock: false },
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST - Create new product
router.post('/', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Update product
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  Object.assign(product, req.body);
  res.json(product);
});

// DELETE - Delete product
router.delete('/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
