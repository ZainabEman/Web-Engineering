const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getVerifications,
  approveVerification,
  rejectVerification,
  getOverviewReport,
  getSessionReport,
  getTutorReport,
  getStudentReport,
  getEarningsReport
} = require('../controllers/adminController');

// Verification routes
router.get('/verifications', protect, authorize('admin'), getVerifications);
router.put('/verifications/:id/approve', protect, authorize('admin'), approveVerification);
router.put('/verifications/:id/reject', protect, authorize('admin'), rejectVerification);

// Report routes
router.get('/reports/overview', protect, authorize('admin'), getOverviewReport);
router.get('/reports/sessions', protect, authorize('admin'), getSessionReport);
router.get('/reports/tutors', protect, authorize('admin'), getTutorReport);
router.get('/reports/students', protect, authorize('admin'), getStudentReport);
router.get('/reports/earnings', protect, authorize('admin'), getEarningsReport);

module.exports = router; 