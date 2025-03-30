const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  uploadImage,
  getSessions,
  acceptSession,
  declineSession,
  completeSession,
  getEarnings,
  getEarningsSummary
} = require('../controllers/tutorController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/upload-image', protect, upload.single('image'), uploadImage);

// Session routes
router.get('/sessions', protect, getSessions);
router.put('/sessions/:sessionId/accept', protect, acceptSession);
router.put('/sessions/:sessionId/decline', protect, declineSession);
router.put('/sessions/:sessionId/complete', protect, completeSession);

// Earnings routes
router.get('/earnings', protect, getEarnings);
router.get('/earnings/summary', protect, getEarningsSummary);

module.exports = router; 