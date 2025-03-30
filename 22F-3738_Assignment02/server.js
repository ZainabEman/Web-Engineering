require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Import DB connection
const connectDB = require('./config/db');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('assets'));


// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'university_course_registration_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/university-registration' 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle course updates
  socket.on('courseUpdate', (data) => {
    // Broadcast the updated course info to all connected clients
    io.emit('courseUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Global middleware to make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Default route for 404
app.use((req, res) => {
  res.status(404).render('auth/error', { message: 'Page not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('auth/error', { message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 