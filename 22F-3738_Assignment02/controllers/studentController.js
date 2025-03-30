const User = require('../models/User');
const Course = require('../models/Course');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

/**
 * Get student dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const student = await User.findById(req.session.user.id)
      .populate('enrolledCourses');

    res.render('student/dashboard', {
      student,
      courses: student.enrolledCourses
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).render('auth/error', {
      message: 'Error loading dashboard. Please try again.'
    });
  }
};

/**
 * Get course catalog
 */
const getCourseCatalog = async (req, res) => {
  try {
    // Get filter parameters
    const { department, courseLevel, day, timeOfDay } = req.query;

    // Build filter object
    const filter = {};

    if (department) {
      filter.department = department;
    }

    if (courseLevel) {
      filter.courseLevel = parseInt(courseLevel);
    }

    if (day) {
      filter['schedule.dayOfWeek'] = day;
    }

    // Get all courses matching filter
    const courses = await Course.find(filter)
      .populate('prerequisites');

    // Get departments for filter dropdown
    const departments = await Course.distinct('department');

    // Get current student with enrolled courses
    const student = await User.findById(req.session.user.id)
      .populate('enrolledCourses');

    // Get all student subscriptions
    const subscriptions = await Subscription.find({
      student: req.session.user.id
    }).select('course');

    const subscribedCourseIds = subscriptions.map(sub => sub.course.toString());

    res.render('student/course-catalog', {
      courses,
      departments,
      student,
      subscribedCourseIds,
      filters: req.query
    });
  } catch (error) {
    console.error('Error fetching course catalog:', error);
    res.status(500).render('auth/error', {
      message: 'Error loading course catalog. Please try again.'
    });
  }
};

/**
 * Enroll in a course
 */
/**
 * Enroll in a course
 */
const enrollInCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courseId } = req.params;
    const studentId = req.session.user.id;

    // Find course and check if seats are available
    const course = await Course.findById(courseId).session(session);

    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.availableSeats < 1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'No seats available in this course'
      });
    }

    // Find student with enrolled courses populated
    const student = await User.findById(studentId)
      .populate('enrolledCourses')
      .session(session);

    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if student is already enrolled
    if (student.enrolledCourses.some(c => c._id.toString() === courseId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Check for schedule conflicts
    const newCourseSchedule = course.schedule;
    for (const enrolledCourse of student.enrolledCourses) {
      for (const enrolledTimeSlot of enrolledCourse.schedule) {
        for (const newTimeSlot of newCourseSchedule) {
          if (enrolledTimeSlot.dayOfWeek === newTimeSlot.dayOfWeek) {
            // Convert time strings to Date objects for comparison
            const enrolledStart = new Date(`2000-01-01T${enrolledTimeSlot.startTime}`);
            const enrolledEnd = new Date(`2000-01-01T${enrolledTimeSlot.endTime}`);
            const newStart = new Date(`2000-01-01T${newTimeSlot.startTime}`);
            const newEnd = new Date(`2000-01-01T${newTimeSlot.endTime}`);

            // Check for overlap
            if ((newStart >= enrolledStart && newStart < enrolledEnd) ||
                (newEnd > enrolledStart && newEnd <= enrolledEnd) ||
                (newStart <= enrolledStart && newEnd >= enrolledEnd)) {
              await session.abortTransaction();
              session.endSession();
              return res.status(400).json({
                success: false,
                message: `Schedule conflict with ${enrolledCourse.courseCode}: ${enrolledCourse.title}`
              });
            }
          }
        }
      }
    }

    // Check prerequisites
    if (course.prerequisites && course.prerequisites.length > 0) {
      const studentCourseIds = student.enrolledCourses.map(c => c._id.toString());
      for (const prereq of course.prerequisites) {
        if (!studentCourseIds.includes(prereq.toString())) {
          // Get the prerequisite course details for the error message
          const prerequisiteCourse = await Course.findById(prereq).session(session);
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({
            success: false,
            message: `Missing prerequisite: ${prerequisiteCourse.courseCode}: ${prerequisiteCourse.title}`
          });
        }
      }
    }

    // All checks passed, enroll student
    course.availableSeats -= 1;
    course.enrolledStudents.push(studentId);
    // Push the ObjectId instead of a string to match the schema type
    student.enrolledCourses.push(course._id);

    await course.save({ session });
    await student.save({ session });

    // Remove any active subscription for this course
    await Subscription.findOneAndUpdate(
      { student: studentId, course: courseId, isActive: true },
      { isActive: false },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Notify other users about seat availability update
    req.io.emit('courseUpdated', {
      courseId,
      availableSeats: course.availableSeats
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course',
      availableSeats: course.availableSeats
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error enrolling in course:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while enrolling in the course'
    });
  }
};


/**
 * Drop a course
 */
const dropCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courseId } = req.params;
    const studentId = req.session.user.id;

    // Find course
    const course = await Course.findById(courseId).session(session);

    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Find student
    const student = await User.findById(studentId).session(session);

    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if student is enrolled in the course
    if (!student.enrolledCourses.includes(courseId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'You are not enrolled in this course'
      });
    }

    // Remove course from student's enrolled courses
    student.enrolledCourses = student.enrolledCourses.filter(
      c => c.toString() !== courseId
    );

    // Remove student from course's enrolled students
    course.enrolledStudents = course.enrolledStudents.filter(
      s => s.toString() !== studentId
    );

    // Increase available seats
    course.availableSeats += 1;

    await student.save({ session });
    await course.save({ session });

    // Check for waiting students and notify them
    await checkWaitlistAndNotify(courseId, session);

    await session.commitTransaction();
    session.endSession();

    // Notify other users about seat availability update
    req.io.emit('courseUpdated', {
      courseId,
      availableSeats: course.availableSeats
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully dropped course',
      availableSeats: course.availableSeats
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error dropping course:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while dropping the course'
    });
  }
};

/**
 * Get weekly schedule
 */
const getWeeklySchedule = async (req, res) => {
  try {
    const student = await User.findById(req.session.user.id)
      .populate('enrolledCourses');

    res.render('student/weekly-schedule', {
      student,
      courses: student.enrolledCourses
    });
  } catch (error) {
    console.error('Error fetching weekly schedule:', error);
    res.status(500).render('auth/error', {
      message: 'Error loading weekly schedule. Please try again.'
    });
  }
};

/**
 * Subscribe to course notification
 */
const subscribeToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.session.user.id;
    const { notificationType } = req.body;

    // Find student
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if student is already subscribed
    const existingSubscription = await Subscription.findOne({
      student: studentId,
      course: courseId,
      isActive: true
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You are already subscribed to this course'
      });
    }

    // Create new subscription
    const subscription = new Subscription({
      student: studentId,
      course: courseId,
      notificationEmail: student.email,
      notificationPhone: student.phone || '',
      notificationType: notificationType || 'email'
    });

    await subscription.save();

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to course notifications'
    });
  } catch (error) {
    console.error('Error subscribing to course:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while subscribing to the course'
    });
  }
};

/**
 * Unsubscribe from course notification
 */
const unsubscribeFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.session.user.id;

    // Find and update subscription
    const subscription = await Subscription.findOneAndUpdate(
      {
        student: studentId,
        course: courseId,
        isActive: true
      },
      {
        isActive: false
      },
      {
        new: true
      }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from course notifications'
    });
  } catch (error) {
    console.error('Error unsubscribing from course:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while unsubscribing from the course'
    });
  }
};

/**
 * Check waitlist and notify students
 */
const checkWaitlistAndNotify = async (courseId, session) => {
  try {
    // Find active subscriptions for this course
    const subscriptions = await Subscription.find({
      course: courseId,
      isActive: true,
      notificationSent: false
    }).session(session);

    if (subscriptions.length === 0) {
      return;
    }

    // Mark subscriptions as notified
    for (const subscription of subscriptions) {
      subscription.notificationSent = true;
      subscription.notificationSentAt = new Date();
      await subscription.save({ session });
    }

    // In a real app, we would send actual notifications here using Twilio
    // For this example, we'll just log it
    console.log(`Notification sent to ${subscriptions.length} students for course ${courseId}`);
  } catch (error) {
    console.error('Error in checkWaitlistAndNotify:', error);
  }
};

module.exports = {
  getDashboard,
  getCourseCatalog,
  enrollInCourse,
  dropCourse,
  getWeeklySchedule,
  subscribeToCourse,
  unsubscribeFromCourse
};
