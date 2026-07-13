const r = require('express').Router();
const c = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
r.post('/', protect, c.placeOrder);
r.get('/user/:userId', protect, c.getUserOrders);
r.get('/:id', protect, c.getOrderById);
r.put('/:id', protect, c.updateOrder);
r.delete('/:id', protect, c.deleteOrder);
module.exports = r;
