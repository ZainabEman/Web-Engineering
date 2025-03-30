const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const notificationController = require('../controllers/notificationController');
const { isAuthenticated } = require('../middleware/auth');

// Apply middleware for all API routes
router.use(isAuthenticated);

// GET course seats information
router.get('/courses/seats', async (req, res) => {
  try {
    const courses = await Course.find().select('_id courseCode availableSeats totalSeats');
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses seats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching courses' 
    });
  }
});

// GET specific course information
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('prerequisites');
    
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }
    
    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching course details' 
    });
  }
});

// POST trigger notifications (admin only)
router.post('/notifications/trigger', isAuthenticated, (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Unauthorized' 
    });
  }
  next();
}, notificationController.triggerNotifications);

module.exports = router; 