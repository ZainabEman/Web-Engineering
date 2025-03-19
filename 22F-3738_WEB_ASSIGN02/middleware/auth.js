/**
 * Authentication middleware for the university course registration system
 */

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
};

// Middleware to check if user is a student
const isStudent = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'student') {
    return next();
  }
  return res.status(403).render('auth/error', { 
    message: 'Access denied. Only students can access this area.' 
  });
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).render('auth/error', { 
    message: 'Access denied. Only administrators can access this area.' 
  });
};

// Middleware to check if user is not authenticated (for login/register pages)
const isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  // Redirect to appropriate dashboard based on role
  if (req.session.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  } else {
    return res.redirect('/student/dashboard');
  }
};

module.exports = {
  isAuthenticated,
  isStudent,
  isAdmin,
  isNotAuthenticated
}; 