// seedData.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const Subscription = require('./models/Subscription'); // if needed

async function seedData() {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Subscription.deleteMany({});
    console.log('Cleared existing data');

    // --- Seed Admin User ---
    const adminData = {
      username: 'admin',
      email: 'zainab@admin.com',
      password: 'zainab123', // pre-save hook will hash this password
      role: 'admin',
      fullName: 'Admin User'
    };

    const adminUser = await User.create(adminData);
    console.log('Admin user created:', adminUser.email);

    // --- Seed Student Users ---
    const studentData = [
      {
        username: 'student1',
        email: 'student1@example.com',
        password: 'student123', 
        role: 'student',
        fullName: 'Student One'
      },
      {
        username: 'student2',
        email: 'student2@example.com',
        password: 'student123',
        role: 'student',
        fullName: 'Student Two'
      }
    ];

    // Create each student individually so that pre-save hooks run
    const studentUsers = await Promise.all(
      studentData.map(data => User.create(data))
    );
    console.log('Student users created:', studentUsers.map(u => u.email));

    // --- Seed Courses ---
    const courseData = [
      {
        courseCode: 'CS101',
        title: 'Introduction to Computer',
        department: 'Computer Science',
        description: 'An overview of the fundamental concepts of computer science.',
        courseLevel: 100,
        credits: 3,
        instructor: 'Tahir Farooq',
        totalSeats: 30,
        availableSeats: 30,
        schedule: [
          { dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:30', location: 'Room 101' },
          { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '10:30', location: 'Room 101' }
        ],
        prerequisites: [] // no prerequisites for introductory course
      },
      {
        courseCode: 'CS201',
        title: 'Data Structures',
        department: 'Computer Science',
        description: 'A study of data structures such as lists, stacks, queues, trees, and graphs.',
        courseLevel: 200,
        credits: 3,
        instructor: 'Nabeela Ashraf',
        totalSeats: 25,
        availableSeats: 25,
        schedule: [
          { dayOfWeek: 'Tuesday', startTime: '11:00', endTime: '12:30', location: 'Room 102' },
          { dayOfWeek: 'Thursday', startTime: '11:00', endTime: '12:30', location: 'Room 102' }
        ],
        prerequisites: [] 
      },
      {
        courseCode: 'MATH101',
        title: 'Calculus I',
        department: 'Mathematics',
        description: 'Differential and integral calculus of one variable.',
        courseLevel: 100,
        credits: 4,
        instructor: 'Amjad Hussain',
        totalSeats: 30,
        availableSeats: 26,
        schedule: [
          { dayOfWeek: 'Monday', startTime: '11:00', endTime: '12:30', location: 'Room 201' },
          { dayOfWeek: 'Wednesday', startTime: '11:00', endTime: '12:30', location: 'Room 201' }
        ],
        prerequisites: []
      },
      // --- New courses with the same timing as CS101 ---
      {
        courseCode: 'HIST101',
        title: 'World History',
        department: 'History',
        description: 'A survey of world history from ancient times to the present.',
        courseLevel: 100,
        credits: 3,
        instructor: 'Zubia Arif',
        totalSeats: 30,
        availableSeats: 15,
        // Same schedule as CS101
        schedule: [
          { dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:30', location: 'Room 101' },
          { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '10:30', location: 'Room 101' }
        ],
        prerequisites: []
      },
      {
        courseCode: 'PHIL101',
        title: 'Introduction to Philosophy',
        department: 'Philosophy',
        description: 'An introductory course covering major philosophical ideas.',
        courseLevel: 100,
        credits: 3,
        instructor: 'Ali Raza',
        totalSeats: 30,
        availableSeats: 30,
        // Same schedule as CS101
        schedule: [
          { dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:30', location: 'Room 101' },
          { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '10:30', location: 'Room 101' }
        ],
        prerequisites: []
      }
    ];

    // Use insertMany for courses (no pre-save hooks needed here)
    const courses = await Course.insertMany(courseData);
    console.log('Courses created:', courses.map(c => c.courseCode));

    // --- Update Prerequisites Example ---
    // Suppose CS201 requires CS101 as a prerequisite.
    const cs101 = courses.find(c => c.courseCode === 'CS101');
    const cs201 = courses.find(c => c.courseCode === 'CS201');
    const m101 = courses.find(c => c.courseCode === 'MATH101');
    const m102 = courses.find(c => c.courseCode === 'HIST101');
    if (cs101 && cs201) {
      cs201.prerequisites.push(cs101._id);
      await cs201.save();
      console.log('Updated prerequisites for CS201');
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
