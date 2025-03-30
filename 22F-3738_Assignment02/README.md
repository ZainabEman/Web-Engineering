# University Course Registration System

A comprehensive web-based system for university course registration with real-time updates, student and admin functionalities, and automated notifications.

## Features

### Student Features
- Interactive weekly schedule visualization
- Real-time course availability updates
- Course search with multiple filters (department, level, time, etc.)
- Prerequisite validation
- Schedule conflict detection
- Course waitlist subscription with notifications

### Admin Features
- Course management (add, update, delete)
- Student enrollment management
- Force enrollment capabilities
- Comprehensive reporting system
- Real-time system monitoring

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Template Engine**: EJS
- **Real-time Updates**: Socket.IO
- **Notifications**: Twilio API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd university-course-registration-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/university-registration
   SESSION_SECRET=your_session_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

4. Start MongoDB service on your machine

5. Run the application:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

6. Access the application at `http://localhost:3000`

## Project Structure

```
university-course-registration-system/
│── public/                      # Frontend assets
│   ├── css/                     # CSS files
│   ├── js/                      # JavaScript files
│   │   ├── common.js           # Shared scripts
│   │   ├── admin/             # Admin JavaScript files
│   │   ├── student/           # Student JavaScript files
│   │   ├── auth.js            # Login scripts
│   ├── images/                # Static images
│
├── views/                     # EJS templates
│   ├── admin/                # Admin views
│   ├── student/              # Student views
│   ├── auth/                 # Authentication views
│
├── routes/                   # Express route handlers
├── models/                   # MongoDB schemas
├── controllers/              # Application logic
├── middleware/              # Access control
├── config/                  # Configuration files
│
├── .env                     # Environment variables
├── server.js               # Express server entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## Usage Guide

### Student Access
1. Log in with your student credentials
2. View available courses in the catalog
3. Check course prerequisites and availability
4. Enroll in courses
5. View your weekly schedule
6. Subscribe to course notifications

### Admin Access
1. Log in with admin credentials
2. Manage courses (add, edit, delete)
3. View and manage student enrollments
4. Generate reports
5. Monitor system activity

## Common Issues & Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB service is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **Real-time Updates Not Working**
   - Check browser console for Socket.IO errors
   - Ensure WebSocket connections are not blocked
   - Verify server is running with WebSocket support

3. **Notification Issues**
   - Verify Twilio credentials in .env
   - Check phone number format
   - Monitor Twilio console for errors

## Security Considerations

- All passwords are hashed using bcrypt
- Session management with secure cookies
- Input validation and sanitization
- CSRF protection
- Rate limiting on API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and queries, please create an issue in the repository or contact the development team. 