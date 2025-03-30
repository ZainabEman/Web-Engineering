const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { isAuthenticated, isStudent } = require('../middleware/auth');

// Apply middleware for all student routes
router.use(isAuthenticated, isStudent);

// GET student dashboard
router.get('/dashboard', studentController.getDashboard);

// GET course catalog
router.get('/courses', studentController.getCourseCatalog);

// GET weekly schedule
router.get('/schedule', studentController.getWeeklySchedule);

// POST enroll in course
router.post('/enroll/:courseId', studentController.enrollInCourse);

// POST drop course
router.post('/drop/:courseId', studentController.dropCourse);

// POST subscribe to course notifications
router.post('/subscribe/:courseId', studentController.subscribeToCourse);

// POST unsubscribe from course notifications
router.post('/unsubscribe/:courseId', studentController.unsubscribeFromCourse);

module.exports = router; 