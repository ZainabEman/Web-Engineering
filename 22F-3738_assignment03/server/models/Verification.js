const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  documents: [{
    type: {
      type: String,
      enum: ['education', 'experience', 'identity', 'other'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: String,
  }],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: String,
  rejectionReason: String,
}, {
  timestamps: true,
});

// Index for efficient queries
verificationSchema.index({ status: 1 });
verificationSchema.index({ tutor: 1 });

module.exports = mongoose.model('Verification', verificationSchema); 