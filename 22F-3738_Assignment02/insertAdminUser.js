const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/university-registration')
  .then(async () => {
    // Optional: Clear existing users
    await User.deleteMany({}); // comment this line if you don't want to delete existing users

    const admin = new User({
      username: 'admin',
      email: 'zainab@admin.com',
      password: 'zainab123', // plain text, will be hashed by pre('save')
      role: 'admin',
      fullName: 'Admin User'
    });

    await admin.save();

    console.log('✅ Admin user inserted successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
