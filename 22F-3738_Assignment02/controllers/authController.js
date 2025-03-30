const User = require('../models/User');

/**
 * Render login page
 */
const getLoginPage = (req, res) => {
  res.render('auth/login', { error: null });
};

/**
 * Handle user logout
 */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
};


/**
 * Handle user login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth/login', { 
        error: 'Invalid email or password'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.render('auth/login', { 
        error: 'Invalid email or password'
      });
    }

    // Store user in session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    };

    // Redirect based on role
    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/student/dashboard');
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.render('auth/login', { 
      error: 'An error occurred during login. Please try again.'
    });
  }
};


/**
 * Render error page
 */
const getErrorPage = (req, res) => {
  const message = req.query.message || 'An error occurred';
  res.render('auth/error', { message });
};

module.exports = {
  getLoginPage,
  login,
  logout,
  getErrorPage
}; 