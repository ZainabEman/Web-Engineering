const User = require('../models/User');
const Verification = require('../models/Verification');
const Session = require('../models/Session');
const { validationResult } = require('express-validator');

// Get all verifications
exports.getVerifications = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const verifications = await Verification.find(query)
      .populate('tutor', '-password')
      .sort({ submittedAt: -1 });

    res.json(verifications);
  } catch (error) {
    console.error('Error fetching verifications:', error);
    res.status(500).json({ message: 'Error fetching verifications' });
  }
};

// Approve tutor verification
exports.approveVerification = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const { comment } = req.body;

    const verification = await Verification.findById(verificationId)
      .populate('tutor');

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found' });
    }

    // Update verification status
    verification.status = 'approved';
    verification.comments = comment;
    verification.reviewedAt = new Date();
    verification.reviewedBy = req.user.id;
    await verification.save();

    // Update tutor status
    const tutor = verification.tutor;
    tutor.isVerified = true;
    await tutor.save();

    res.json(verification);
  } catch (error) {
    console.error('Error approving verification:', error);
    res.status(500).json({ message: 'Error approving verification' });
  }
};

// Reject tutor verification
exports.rejectVerification = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const { comment } = req.body;

    const verification = await Verification.findById(verificationId)
      .populate('tutor');

    if (!verification) {
      return res.status(404).json({ message: 'Verification not found' });
    }

    // Update verification status
    verification.status = 'rejected';
    verification.rejectionReason = comment;
    verification.reviewedAt = new Date();
    verification.reviewedBy = req.user.id;
    await verification.save();

    // Update tutor status
    const tutor = verification.tutor;
    tutor.isVerified = false;
    await tutor.save();

    res.json(verification);
  } catch (error) {
    console.error('Error rejecting verification:', error);
    res.status(500).json({ message: 'Error rejecting verification' });
  }
};

// Get overview report
exports.getOverviewReport = async (req, res) => {
  try {
    const [
      totalTutors,
      verifiedTutors,
      totalStudents,
      totalSessions,
      totalEarnings,
    ] = await Promise.all([
      User.countDocuments({ role: 'tutor' }),
      User.countDocuments({ role: 'tutor', isVerified: true }),
      User.countDocuments({ role: 'student' }),
      Session.countDocuments({ status: 'completed' }),
      Session.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    res.json({
      totalTutors,
      verifiedTutors,
      totalStudents,
      totalSessions,
      totalEarnings: totalEarnings[0]?.total || 0,
    });
  } catch (error) {
    console.error('Error generating overview report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};

// Get session report
exports.getSessionReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      ...(startDate && endDate && {
        startTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }),
    };

    const sessions = await Session.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    res.json(sessions);
  } catch (error) {
    console.error('Error generating session report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};

// Get tutor report
exports.getTutorReport = async (req, res) => {
  try {
    const tutors = await User.aggregate([
      { $match: { role: 'tutor' } },
      {
        $lookup: {
          from: 'sessions',
          localField: '_id',
          foreignField: 'tutor',
          as: 'sessions',
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          isVerified: 1,
          totalSessions: { $size: '$sessions' },
          totalEarnings: {
            $sum: {
              $filter: {
                input: '$sessions',
                as: 'session',
                cond: { $eq: ['$$session.status', 'completed'] },
              },
            },
          },
          rating: 1,
        },
      },
    ]);

    res.json(tutors);
  } catch (error) {
    console.error('Error generating tutor report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};

// Get student report
exports.getStudentReport = async (req, res) => {
  try {
    const students = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $lookup: {
          from: 'sessions',
          localField: '_id',
          foreignField: 'student',
          as: 'sessions',
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalSessions: { $size: '$sessions' },
          totalSpent: {
            $sum: {
              $filter: {
                input: '$sessions',
                as: 'session',
                cond: { $eq: ['$$session.status', 'completed'] },
              },
            },
          },
        },
      },
    ]);

    res.json(students);
  } catch (error) {
    console.error('Error generating student report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};

// Get earnings report
exports.getEarningsReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      status: 'completed',
      ...(startDate && endDate && {
        startTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }),
    };

    const earnings = await Session.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$startTime' },
            month: { $month: '$startTime' },
          },
          totalEarnings: { $sum: '$amount' },
          sessionCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json(earnings);
  } catch (error) {
    console.error('Error generating earnings report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
}; 