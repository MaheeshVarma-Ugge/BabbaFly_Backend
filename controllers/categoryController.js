// Paste controller code here
const Category = require('../models/Category');
const Listing = require('../models/Listing');

// =========================================
// GET /api/categories
// Fetch All Categories
// =========================================

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({
      name: 1
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (err) {
    next(err);
  }
};

// =========================================
// GET /api/categories/:id/listings
// Fetch Listings by Category
// =========================================

const getListingsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    const listings = await Listing.find({
      category: req.params.id
    })
      .populate('category', 'name iconUrl')
      .populate('sellerId', 'name email phone')
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      category: {
        id: category._id,
        name: category.name,
        iconUrl: category.iconUrl
      },
      count: listings.length,
      listings
    });
  } catch (err) {
    next(err);
  }
};

// =========================================
// POST /api/categories
// Create Category (Optional)
// =========================================

const createCategory = async (req, res, next) => {
  try {
    const { name, iconUrl } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.'
      });
    }

    const existingCategory = await Category.findOne({
      name
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists.'
      });
    }

    const category = await Category.create({
      name,
      iconUrl
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      category
    });
  } catch (err) {
    next(err);
  }
};

// =========================================
// PUT /api/categories/:id
// Update Category (Optional)
// =========================================

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    category.name = req.body.name ?? category.name;

    category.iconUrl = req.body.iconUrl ?? category.iconUrl;

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully.',
      category
    });
  } catch (err) {
    next(err);
  }
};

// =========================================
// DELETE /api/categories/:id
// Delete Category (Optional)
// =========================================

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    const listings = await Listing.find({
      category: req.params.id
    });

    if (listings.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category because listings exist under it.'
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,

  getListingsByCategory,

  createCategory,

  updateCategory,

  deleteCategory
};
