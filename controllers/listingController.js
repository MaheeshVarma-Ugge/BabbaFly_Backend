// Paste controller code here
const Listing = require('../models/Listing');
const Category = require('../models/Category');

const { listingValidation } = require('../validators/listingValidator');

// ========================================
// GET /api/listings
// Get All Listings
// Supports:
// ?price=min-max
// ?location=city
// ?sort=latest|price_low|price_high|popular
// ========================================

const getAllListings = async (req, res, next) => {
  try {
    const query = {};

    // Price Filter
    if (req.query.price) {
      const prices = req.query.price.split('-');

      query.price = {
        $gte: Number(prices[0]),
        $lte: Number(prices[1])
      };
    }

    // Location Filter
    if (req.query.location) {
      query.location = {
        $regex: req.query.location,
        $options: 'i'
      };
    }

    let sortOption = {};

    switch (req.query.sort) {
      case 'price_low':
        sortOption = { price: 1 };
        break;

      case 'price_high':
        sortOption = { price: -1 };
        break;

      case 'popular':
        sortOption = { rating: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const listings = await Listing.find(query)
      .populate('category', 'name')
      .populate('sellerId', 'name email phone')
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// GET /api/listings/:id
// Get Single Listing
// ========================================

const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('category')
      .populate('sellerId', '-password');

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found.'
      });
    }

    res.status(200).json({
      success: true,
      listing
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// POST /api/listings
// Create Listing
// Protected Route
// ========================================

const createListing = async (req, res, next) => {
  try {
    const body = {
      ...req.body,
      sellerId: req.user._id
    };

    const { error } = listingValidation(body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const category = await Category.findById(body.category);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    const listing = await Listing.create({
      title: body.title,
      description: body.description,
      category: body.category,
      price: body.price,
      location: body.location,
      images: body.images,
      sellerId: req.user._id,
      rating: body.rating || 0
    });

    res.status(201).json({
      success: true,
      message: 'Listing created successfully.',
      listing
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// PUT /api/listings/:id
// Update Listing
// ========================================

const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found.'
      });
    }

    // Only Seller Can Edit

    if (listing.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this listing.'
      });
    }

    listing.title = req.body.title ?? listing.title;

    listing.description = req.body.description ?? listing.description;

    listing.category = req.body.category ?? listing.category;

    listing.price = req.body.price ?? listing.price;

    listing.location = req.body.location ?? listing.location;

    listing.images = req.body.images ?? listing.images;

    listing.rating = req.body.rating ?? listing.rating;

    await listing.save();

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully.',
      listing
    });
  } catch (err) {
    next(err);
  }
};

// ========================================
// DELETE /api/listings/:id
// Delete Listing
// ========================================

const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found.'
      });
    }

    if (listing.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this listing.'
      });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllListings,

  getListingById,

  createListing,

  updateListing,

  deleteListing
};
