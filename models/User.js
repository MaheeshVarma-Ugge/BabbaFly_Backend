const mongoose = require('mongoose');
module.exports = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true },
      phone: { type: String, unique: true },
      password: String,
      avatarUrl: String,
      role: { type: String, default: 'user' }
    },
    { timestamps: true }
  )
);
