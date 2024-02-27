const express = require('express');
const router = express.Router();

// Example data (replace with your database operations)
let orders = [
  { id: 1, date: '2024-02-27', orderId: 'ORD001', customerName: 'John Doe', codAmount: 100, status: 'Pending' },
  { id: 2, date: '2024-02-28', orderId: 'ORD002', customerName: 'Jane Smith', codAmount: 150, status: 'Delivered' },
  { id: 3, date: '2024-02-29', orderId: 'ORD003', customerName: 'Alice Johnson', codAmount: 200, status: 'Shipped' }
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
  const { date, orderId, customerName, codAmount, status } = req.body;
  const newOrder = { 
    id: orders.length + 1, 
    date, 
    orderId, 
    customerName, 
    codAmount, 
    status 
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PUT update an existing order
router.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { date, orderId, customerName, codAmount, status } = req.body;
  const index = orders.findIndex(order => order.id === parseInt(id));
  if (index !== -1) {
    orders[index] = { id: parseInt(id), date, orderId, customerName, codAmount, status };
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
