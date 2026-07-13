const mongoose = require('mongoose');
module.exports = mongoose.model(
  'Order',
  new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
      amount: Number,
      status: { type: String, default: 'Pending' },
      paymentStatus: { type: String, default: 'Pending' }
    },
    { timestamps: true }
  )
);
