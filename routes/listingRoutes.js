const r = require('express').Router();
const c = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
r.get('/', c.getAllListings);
r.get('/:id', c.getListingById);
r.post('/', protect, c.createListing);
r.put('/:id', protect, c.updateListing);
r.delete('/:id', protect, c.deleteListing);
module.exports = r;
