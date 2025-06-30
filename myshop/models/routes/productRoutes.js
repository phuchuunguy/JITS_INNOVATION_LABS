const express = require('express');
const router = express.Router();
const db = require('../models');

const Product = db.Product;

// GET all
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// GET one
router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// POST
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  const updated = await Product.update(req.body, { where: { id: req.params.id } });
  if (updated[0] === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Updated successfully' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Product.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
