const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create indexes for optimized search
    await Promise.all([
      // User indexes
      mongoose.model('User').createIndexes({
        'subjects': 1,
        'location': '2dsphere',
        'rating': -1,
        'role': 1,
      }),

      // Session indexes
      mongoose.model('Session').createIndexes({
        'tutor': 1,
        'student': 1,
        'status': 1,
        'startTime': 1,
      }),

      // Verification indexes
      mongoose.model('Verification').createIndexes({
        'tutor': 1,
        'status': 1,
        'submittedAt': -1,
      }),
    ]);

    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Handle MongoDB disconnection
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

module.exports = connectDB; 