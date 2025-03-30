# TutorConnect - Online Tutoring Platform

A full-stack web application connecting students with qualified tutors for online learning sessions.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Role-based access control (Student, Tutor, Admin)
  - Email verification and password reset functionality

- **Tutor Management**
  - Tutor profile creation and verification
  - Document upload and verification process
  - Availability management
  - Rating and review system

- **Session Management**
  - Real-time session scheduling
  - Video conferencing integration
  - Session status tracking
  - Payment processing

- **Admin Dashboard**
  - Tutor verification workflow
  - User management
  - Analytics and reporting
  - System monitoring

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- Material-UI for components
- Socket.io-client for real-time features

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time communication
- Multer for file uploads

### Infrastructure
- MongoDB Atlas for database
- AWS S3 for file storage
- Cloudinary for image processing
- SendGrid for email services

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- AWS account (for S3)
- Cloudinary account
- SendGrid account

## Environment Variables

Create `.env` files in both `server` and `client` directories:

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SENDGRID_API_KEY=your_sendgrid_key
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_CLOUDINARY_URL=your_cloudinary_url
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tutorconnect.git
cd tutorconnect
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Project Structure

```
tutorconnect/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── context/       # React Context providers
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── utils/         # Utility functions
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
│
└── README.md
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/reset-password/:token` - Reset password

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload profile picture

### Tutor Endpoints
- `GET /api/tutors/search` - Search tutors
- `GET /api/tutors/:id` - Get tutor details
- `POST /api/tutors/verification` - Submit verification
- `PUT /api/tutors/availability` - Update availability

### Session Endpoints
- `POST /api/sessions` - Create session
- `GET /api/sessions` - Get sessions list
- `GET /api/sessions/:id` - Get session details
- `PUT /api/sessions/:id/status` - Update session status
- `POST /api/sessions/:id/review` - Add session review

## Performance Optimization

- Database indexes for optimized queries
- Image optimization with Cloudinary
- Caching strategies
- Rate limiting for API endpoints
- Lazy loading for components
- Code splitting for routes

## Security Measures

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- XSS protection
- CSRF protection
- Secure headers with Helmet

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@tutorconnect.com or create an issue in the repository. 