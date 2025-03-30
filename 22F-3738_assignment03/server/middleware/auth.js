const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('./errorHandler');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
  } catch (err) {
    next(err);
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Rate limiting middleware
exports.rateLimiter = (maxRequests, timeWindow) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (requests.has(ip)) {
      const userData = requests.get(ip);
      const windowStart = now - timeWindow;
      
      // Remove old requests
      userData.timestamps = userData.timestamps.filter(time => time > windowStart);
      
      if (userData.timestamps.length >= maxRequests) {
        return next(
          new ErrorResponse('Too many requests, please try again later', 429)
        );
      }
      
      userData.timestamps.push(now);
      requests.set(ip, userData);
    } else {
      requests.set(ip, { timestamps: [now] });
    }
    
    next();
  };
}; 