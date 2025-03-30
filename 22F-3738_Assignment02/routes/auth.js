const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middleware/auth');

// GET login page
router.get('/login', isNotAuthenticated, authController.getLoginPage);

// POST login
router.post('/login', isNotAuthenticated, authController.login);

// GET logout
router.get('/logout', authController.logout);

// GET error page
router.get('/error', authController.getErrorPage);

// Redirect root to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

module.exports = router; 