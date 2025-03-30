const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  notificationEmail: {
    type: String,
    required: true
  },
  notificationPhone: {
    type: String
  },
  notificationType: {
    type: String,
    enum: ['email', 'sms', 'both'],
    default: 'email',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  notificationSentAt: {
    type: Date
  }
});

// Compound index to ensure a student can only subscribe once to a course
SubscriptionSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema); 