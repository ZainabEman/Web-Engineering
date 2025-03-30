const { ErrorResponse } = require('../middleware/errorHandler');
const User = require('../models/User');
const Session = require('../models/Session');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// @desc    Get tutor profile
// @route   GET /api/tutor/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const tutor = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: tutor });
  } catch (err) {
    next(err);
  }
};

// @desc    Update tutor profile
// @route   PUT /api/tutor/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const tutor = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({ success: true, data: tutor });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload profile image
// @route   POST /api/tutor/upload-image
// @access  Private
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    const tutor = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: req.file.path },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, data: tutor });
  } catch (err) {
    next(err);
  }
};

// @desc    Get tutor's sessions
// @route   GET /api/tutor/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ tutor: req.user.id })
      .populate('student', 'name email')
      .sort('-startTime');
    
    res.status(200).json({ success: true, data: sessions });
  } catch (err) {
    next(err);
  }
};

// @desc    Accept session
// @route   PUT /api/tutor/sessions/:sessionId/accept
// @access  Private
exports.acceptSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.tutor.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to accept this session', 403));
    }

    session.status = 'confirmed';
    await session.save();

    res.status(200).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// @desc    Decline session
// @route   PUT /api/tutor/sessions/:sessionId/decline
// @access  Private
exports.declineSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.tutor.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to decline this session', 403));
    }

    session.status = 'cancelled';
    await session.save();

    res.status(200).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// @desc    Complete session
// @route   PUT /api/tutor/sessions/:sessionId/complete
// @access  Private
exports.completeSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    
    if (!session) {
      return next(new ErrorResponse('Session not found', 404));
    }

    if (session.tutor.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to complete this session', 403));
    }

    session.status = 'completed';
    await session.save();

    res.status(200).json({ success: true, data: session });
  } catch (err) {
    next(err);
  }
};

// @desc    Get tutor's earnings
// @route   GET /api/tutor/earnings
// @access  Private
exports.getEarnings = async (req, res, next) => {
  try {
    const sessions = await Session.find({
      tutor: req.user.id,
      status: 'completed'
    }).sort('-startTime');

    const earnings = sessions.map(session => ({
      sessionId: session._id,
      amount: session.amount,
      date: session.startTime,
      student: session.student
    }));

    res.status(200).json({ success: true, data: earnings });
  } catch (err) {
    next(err);
  }
};

// @desc    Get earnings summary
// @route   GET /api/tutor/earnings/summary
// @access  Private
exports.getEarningsSummary = async (req, res, next) => {
  try {
    const sessions = await Session.find({
      tutor: req.user.id,
      status: 'completed'
    });

    const totalEarnings = sessions.reduce((sum, session) => sum + session.amount, 0);
    const totalSessions = sessions.length;
    const averageEarning = totalSessions > 0 ? totalEarnings / totalSessions : 0;

    res.status(200).json({
      success: true,
      data: {
        totalEarnings,
        totalSessions,
        averageEarning
      }
    });
  } catch (err) {
    next(err);
  }
}; 