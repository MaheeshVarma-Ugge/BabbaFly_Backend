const r = require('express').Router();
const c = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
r.get('/', c.getAllCategories);
r.get('/:id/listings', c.getListingsByCategory);
r.post('/', protect, c.createCategory);
r.put('/:id', protect, c.updateCategory);
r.delete('/:id', protect, c.deleteCategory);
module.exports = r;
