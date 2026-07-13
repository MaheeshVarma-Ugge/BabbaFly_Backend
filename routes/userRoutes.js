const r = require('express').Router();
const c = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
r.post('/register', c.registerUser);
r.post('/login', c.loginUser);
r.get('/:id', protect, c.getUserProfile);
r.put('/:id', protect, c.updateUser);
module.exports = r;
