const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const studentController = require('../controllers/studentController');

// Tutor search and filtering
router.get('/search', protect, studentController.searchTutors);

// Wishlist management
router.post('/wishlist/toggle', protect, studentController.toggleWishlist);
router.get('/wishlist', protect, studentController.getWishlist);

// Session booking
router.post('/book', protect, studentController.bookSession);
router.get('/sessions', protect, studentController.getSessions);
router.put('/sessions/:sessionId', protect, studentController.updateSession);
router.delete('/sessions/:sessionId', protect, studentController.cancelSession);

// Reviews
router.post('/review', protect, studentController.submitReview);
router.get('/reviews/:tutorId', protect, studentController.getTutorReviews);

module.exports = router; 