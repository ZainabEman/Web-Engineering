const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Ensure one wishlist per student
wishlistSchema.index({ student: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema); 