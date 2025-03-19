const User = require('../models/User');
const Course = require('../models/Course');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

/**
 * Get admin dashboard
 */
const getDashboard = async (req, res) => {
  try {
    // Get counts
    const coursesCount = await Course.countDocuments();
    const studentsCount = await User.countDocuments({ role: 'student' });
    
    // Get courses with available seats < 5
    const lowAvailabilityCoursesCount = await Course.countDocuments({ availableSeats: { $lt: 5 } });
    
    // Get recent courses
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      coursesCount,
      studentsCount,
      lowAvailabilityCoursesCount,
      recentCourses
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).render('auth/error', { 
      message: 'Error loading dashboard. Please try again.' 
    });
  }
};

/**
 * Get all courses
 */
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('prerequisites')
      .sort({ department: 1, courseCode: 1 });
    
    res.render('admin/courses', { courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).render('auth/error', { 
      message: 'Error loading courses. Please try again.' 
    });
  }
};

/**
 * Get course form for creating/editing
 */
const getCourseForm = async (req, res) => {
  try {
    const { id } = req.params;
    let course = null;
    
    // Get all courses for prerequisites selection
    const allCourses = await Course.find().select('courseCode title');
    
    if (id) {
      // Edit existing course
      course = await Course.findById(id).populate('prerequisites');
      if (!course) {
        return res.status(404).render('auth/error', { 
          message: 'Course not found' 
        });
      }
    }
    
    res.render('admin/course-form', { 
      course, 
      allCourses,
      action: course ? 'edit' : 'create'
    });
  } catch (error) {
    console.error('Error getting course form:', error);
    res.status(500).render('auth/error', { 
      message: 'Error loading course form. Please try again.' 
    });
  }
};

/**
 * Create a new course
 */
const createCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { 
      courseCode, 
      title, 
      department, 
      description, 
      courseLevel, 
      credits, 
      instructor, 
      totalSeats,
      schedule,
      prerequisites
    } = req.body;
    
    // Create new course
    const course = new Course({
      courseCode,
      title,
      department,
      description,
      courseLevel,
      credits,
      instructor,
      totalSeats,
      availableSeats: totalSeats,
      schedule: JSON.parse(schedule),
      prerequisites: prerequisites ? JSON.parse(prerequisites) : []
    });
    
    await course.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    req.io.emit('newCourse', { courseId: course._id });
    
    res.redirect('/admin/courses');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating course:', error);
    res.status(500).render('auth/error', { 
      message: 'Error creating course. Please try again.' 
    });
  }
};

/**
 * Update an existing course
 */
const updateCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    const { 
      courseCode, 
      title, 
      department, 
      description, 
      courseLevel, 
      credits, 
      instructor, 
      totalSeats,
      availableSeats,
      schedule,
      prerequisites
    } = req.body;
    
    // Find existing course
    const course = await Course.findById(id).session(session);
    
    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).render('auth/error', { 
        message: 'Course not found' 
      });
    }
    
    // Check if seats are reduced and there are enrolled students
    const oldAvailableSeats = course.availableSeats;
    const newAvailableSeats = parseInt(availableSeats);
    
    // Update course fields
    course.courseCode = courseCode;
    course.title = title;
    course.department = department;
    course.description = description;
    course.courseLevel = courseLevel;
    course.credits = credits;
    course.instructor = instructor;
    course.totalSeats = totalSeats;
    course.availableSeats = newAvailableSeats;
    course.schedule = JSON.parse(schedule);
    course.prerequisites = prerequisites ? JSON.parse(prerequisites) : [];
    
    await course.save({ session });
    
    // If available seats increased, notify waitlisted students
    if (newAvailableSeats > oldAvailableSeats) {
      await checkWaitlistAndNotify(id, session);
    }
    
    await session.commitTransaction();
    session.endSession();
    
    // Notify clients about the update
    req.io.emit('courseUpdated', {
      courseId: course._id,
      availableSeats: course.availableSeats
    });
    
    res.redirect('/admin/courses');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error updating course:', error);
    res.status(500).render('auth/error', { 
      message: 'Error updating course. Please try again.' 
    });
  }
};

/**
 * Delete a course
 */
const deleteCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    
    // Find course
    const course = await Course.findById(id).populate('enrolledStudents').session(session);
    
    if (!course) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }
    
    // Check if students are enrolled
    if (course.enrolledStudents.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete course with enrolled students' 
      });
    }
    
    // Delete all subscriptions for this course
    await Subscription.deleteMany({ course: id }).session(session);
    
    // Delete course
    await course.deleteOne({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    req.io.emit('courseDeleted', { courseId: id });
    
    return res.status(200).json({ 
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting course:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while deleting the course' 
    });
  }
};

/**
 * Get all students
 */
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .populate('enrolledCourses')
      .sort({ fullName: 1 });
    
    res.render('admin/students', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).render('auth/error', { 
      message: 'Error loading students. Please try again.' 
    });
  }
};

/**
 * Get student details
 */
const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await User.findById(id)
      .populate('enrolledCourses');
    
    if (!student) {
      return res.status(404).render('auth/error', { 
        message: 'Student not found' 
      });
    }
    
    // Get all courses for enrollment management
    const allCourses = await Course.find().sort({ department: 1, courseCode: 1 });
    
    res.render('admin/student-details', { 
      student,
      allCourses
    });
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).render('auth/error', { 
      message: 'Error loading student details. Please try again.' 
    });
  }
};

/**
 * Force enroll student in course
 */
const forceEnrollStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { studentId, courseId } = req.params;
    
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
    
    // Check if student is already enrolled
    if (student.enrolledCourses.includes(courseId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: 'Student is already enrolled in this course' 
      });
    }
    
    // Add course to student and student to course
    student.enrolledCourses.push(courseId);
    course.enrolledStudents.push(studentId);
    
    // Handle seats availability
    if (course.availableSeats > 0) {
      course.availableSeats -= 1;
    }
    
    await student.save({ session });
    await course.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    req.io.emit('courseUpdated', {
      courseId,
      availableSeats: course.availableSeats
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Student successfully enrolled in course',
      availableSeats: course.availableSeats
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error force enrolling student:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while enrolling the student' 
    });
  }
};

/**
 * Remove student from course
 */
const removeStudentFromCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { studentId, courseId } = req.params;
    
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
    
    // Check if student is enrolled
    if (!student.enrolledCourses.includes(courseId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ 
        success: false, 
        message: 'Student is not enrolled in this course' 
      });
    }
    
    // Remove course from student
    student.enrolledCourses = student.enrolledCourses.filter(
      c => c.toString() !== courseId
    );
    
    // Remove student from course
    course.enrolledStudents = course.enrolledStudents.filter(
      s => s.toString() !== studentId
    );
    
    // Increase available seats
    course.availableSeats += 1;
    
    await student.save({ session });
    await course.save({ session });
    
    // Check waitlist for notifications
    await checkWaitlistAndNotify(courseId, session);
    
    await session.commitTransaction();
    session.endSession();
    
    req.io.emit('courseUpdated', {
      courseId,
      availableSeats: course.availableSeats
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Student successfully removed from course',
      availableSeats: course.availableSeats
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error removing student from course:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while removing the student' 
    });
  }
};

/**
 * Generate reports
 */
const getReports = async (req, res) => {
  try {
    // Get report type
    const { type } = req.query;
    
    let reportData = null;
    let reportTitle = '';
    
    if (type === 'enrollment') {
      // Enrollment report - courses with number of students
      reportData = await Course.aggregate([
        {
          $project: {
            courseCode: 1,
            title: 1,
            department: 1,
            totalSeats: 1,
            availableSeats: 1,
            enrolledCount: { $size: '$enrolledStudents' }
          }
        },
        { $sort: { department: 1, courseCode: 1 } }
      ]);
      reportTitle = 'Course Enrollment Report';
      
    } else if (type === 'available-seats') {
      // Available seats report - courses with open seats
      reportData = await Course.find({ availableSeats: { $gt: 0 } })
        .select('courseCode title department totalSeats availableSeats')
        .sort({ availableSeats: -1 });
      reportTitle = 'Available Seats Report';
      
    } else if (type === 'prerequisite') {
      // Missing prerequisites report
      // This is complex and would require checking each student against prerequisites
      // For demo purposes, we'll just show a placeholder
      reportData = { message: 'Prerequisite report would be generated here' };
      reportTitle = 'Missing Prerequisites Report';
      
    } else {
      // Default to no report selected
      reportData = null;
      reportTitle = 'Select a Report Type';
    }
    
    res.render('admin/reports', { 
      reportType: type,
      reportTitle,
      reportData
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).render('auth/error', { 
      message: 'Error generating report. Please try again.' 
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
    // For this demo, we'll just log it
    console.log(`Admin action: Notification sent to ${subscriptions.length} students for course ${courseId}`);
  } catch (error) {
    console.error('Error in checkWaitlistAndNotify:', error);
  }
};

module.exports = {
  getDashboard,
  getCourses,
  getCourseForm,
  createCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  getStudentDetails,
  forceEnrollStudent,
  removeStudentFromCourse,
  getReports
}; 