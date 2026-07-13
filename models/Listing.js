const mongoose = require('mongoose');
module.exports = mongoose.model(
  'Listing',
  new mongoose.Schema(
    {
      title: String,
      description: String,
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      price: Number,
      location: String,
      images: [String],
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, default: 0 }
    },
    { timestamps: true }
  )
);
