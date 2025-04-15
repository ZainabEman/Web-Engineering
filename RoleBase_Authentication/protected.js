const express = require('express');
const { authenticateToken, authorizationRole } = require('./auth');
const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to your profile' });
});

router.get('/admin', authenticateToken, authorizationRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin panel' });
});

router.get('/editor', authenticateToken, authorizationRole('editor'), (req, res) => {
    res.json({ message: 'Welcome to the editor panel' });
});

module.exports = router;
