const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Apply middleware for all admin routes
router.use(isAuthenticated, isAdmin);

// GET admin dashboard
router.get('/dashboard', adminController.getDashboard);

// GET all courses
router.get('/courses', adminController.getCourses);

// GET course form (new or edit)
router.get('/courses/new', adminController.getCourseForm);
router.get('/courses/:id/edit', adminController.getCourseForm);

// POST create course
router.post('/courses', adminController.createCourse);

// POST update course
router.post('/courses/:id', adminController.updateCourse);

// DELETE course
router.delete('/courses/:id', adminController.deleteCourse);

// GET all students
router.get('/students', adminController.getStudents);

// GET student details
router.get('/students/:id', adminController.getStudentDetails);

// POST force enroll student in course
router.post('/students/:studentId/enroll/:courseId', adminController.forceEnrollStudent);

// POST remove student from course
router.post('/students/:studentId/remove/:courseId', adminController.removeStudentFromCourse);

// GET reports
router.get('/reports', adminController.getReports);

module.exports = router; 