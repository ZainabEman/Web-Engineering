const { ErrorResponse } = require('../middleware/errorHandler');
const User = require('../models/User');
const Session = require('../models/Session');

// @desc    Search tutors
// @route   GET /api/student/search
// @access  Private
exports.searchTutors = async (req, res, next) => {
  try {
    const { subject, location, rating } = req.query;
    let query = { role: 'tutor', isVerified: true };

    if (subject) {
      query.subjects = subject;
    }

    if (location) {
      query.location = location;
    }

    if (rating) {
      query.rating = { $gte: rating };
    }

    const tutors = await User.find(query).select('-password');
    res.status(200).json({ success: true, data: tutors });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle tutor in wishlist
// @route   POST /api/student/wishlist/toggle
// @access  Private
exports.toggleWishlist = async (req, res, next) => {
  try {
    const { tutorId } = req.body;
    const student = await User.findById(req.user.id);
    
    const wishlistIndex = student.wishlist.indexOf(tutorId);
    if (wishlistIndex === -1) {
      student.wishlist.push(tutorId);
    } else {
      student.wishlist.splice(wishlistIndex, 1);
    }

    await student.save();
    res.status(200).json({ success: true, data: student.wishlist });
  } catch (err) {
    next(err);
  }
};

// @desc    Get student's wishlist
// @route   GET /api/student/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    const student = await User.findById(req.user.id).populate('wishlist');
    res.status(200).json({ success: true, data: student.wishlist });
  } catch (err) {
    next(err);
  }
};

// @desc    Book a session
// @route   POST /api/student/book
// @access  Private
exports.bookSession = async (req, res, next) => {
  try {
    const { tutorId, subject, date, duration } = req.body;
    
    const session = await Session.create({
      student: req.user.id,
      tutor: tutorId,
      subject,
      startTime: date,
      duration,
      status: 'pending'
    });

    res.status(201).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// @desc    Get student's sessions
// @route   GET /api/student/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ student: req.user.id })
      .populate('tutor', 'name email')
      .sort('-startTime');
    
    res.status(200).json({ success: true, data: sessions });
  } catch (err) {
    next(err);
  }
};

// @desc    Update session
// @route   PUT /api/student/sessions/:sessionId
// @access  Private
exports.updateSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.student.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to update this session', 403));
    }

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.sessionId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedSession });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel session
// @route   DELETE /api/student/sessions/:sessionId
// @access  Private
exports.cancelSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.student.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to cancel this session', 403));
    }

    await Session.findByIdAndDelete(req.params.sessionId);
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit review for a session
// @route   POST /api/student/review
// @access  Private
exports.submitReview = async (req, res, next) => {
  try {
    const { sessionId, rating, comment } = req.body;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.student.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to review this session', 403));
    }

    const tutor = await User.findById(session.tutor);
    tutor.reviews.push({
      student: req.user.id,
      rating,
      comment,
      session: sessionId
    });

    // Update tutor's average rating
    const ratings = tutor.reviews.map(review => review.rating);
    tutor.rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

    await tutor.save();
    res.status(200).json({ success: true, data: tutor });
  } catch (err) {
    next(err);
  }
};

// @desc    Get tutor reviews
// @route   GET /api/student/reviews/:tutorId
// @access  Private
exports.getTutorReviews = async (req, res, next) => {
  try {
    const tutor = await User.findById(req.params.tutorId)
      .select('reviews')
      .populate('reviews.student', 'name');
    
    if (!tutor) {
      return next(new ErrorResponse('Tutor not found', 404));
    }

    res.status(200).json({ success: true, data: tutor.reviews });
  } catch (err) {
    next(err);
  }
}; 