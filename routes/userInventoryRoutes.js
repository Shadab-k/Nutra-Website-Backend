const express = require('express');
const router = express.Router();

// Example data (replace with your database operations)
let orders = [
  { id: 1, date: '2024-02-27', skuCode: 'SKU001', brand: 'Brand A', issuedQty: 10, delivered: 7, damageLost: 1, balanceQty: 2 },
  { id: 2, date: '2024-02-28', skuCode: 'SKU002', brand: 'Brand B', issuedQty: 20, delivered: 18, damageLost: 0, balanceQty: 2 },
  { id: 3, date: '2024-02-29', skuCode: 'SKU003', brand: 'Brand C', issuedQty: 15, delivered: 12, damageLost: 1, balanceQty: 2 }
];

// GET all orders
router.get('/orders', (req, res) => {
  res.json(orders);
});

// GET a specific order by ID
router.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(order => order.id === parseInt(id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// POST a new order
router.post('/orders', (req, res) => {
  const { date, skuCode, brand, issuedQty, delivered, damageLost, balanceQty } = req.body;
  const newOrder = { 
    id: orders.length + 1, 
    date, 
    skuCode, 
    brand, 
    issuedQty, 
    delivered, 
    damageLost, 
    balanceQty 
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PUT update an existing order
router.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { date, skuCode, brand, issuedQty, delivered, damageLost, balanceQty } = req.body;
  const index = orders.findIndex(order => order.id === parseInt(id));
  if (index !== -1) {
    orders[index] = { id: parseInt(id), date, skuCode, brand, issuedQty, delivered, damageLost, balanceQty };
    res.json(orders[index]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// DELETE an existing order
router.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  const index = orders.findIndex(order => order.id === parseInt(id));
  if (index !== -1) {
    orders.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

module.exports = router;
