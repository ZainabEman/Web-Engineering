/**
 * Node.js and Express.js Learning Resource
 * This file demonstrates various concepts from basic to advanced
 */

// Importing required modules
const express = require('express');
const bodyParser = require('body-parser'); // Uncomment when needed
const app = express();

/**
 * Middleware Configuration
 * Middleware functions are functions that have access to the request object (req),
 * the response object (res), and the next middleware function in the application's
 * request-response cycle.
 */

// Body Parser Middleware
// Uncomment these lines when you need to parse form data or JSON
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

/**
 * Basic Route Handling
 * Routes define how an application responds to client requests to a particular endpoint
 */

// Root route - GET request
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Node.js Learning</h1>');
});

// About route - GET request with JSON response
app.get('/about', (req, res) => {
    res.json({
        name: "Zainab",
        course: "Web Development",
        topic: "Node.js and Express"
    });
});

/**
 * Request Processing Middleware
 * This middleware logs request details and demonstrates how to access request properties
 */
app.use((req, res, next) => {
    // Log request method (GET, POST, PUT, DELETE, etc.)
    console.log('Request Method:', req.method);
    
    // Log protocol (http or https)
    console.log('Protocol:', req.protocol);
    
    // Log host information
    console.log('Host:', req.get('host'));
    
    // Log original URL
    console.log('Original URL:', req.originalUrl);
    
    // Log request body (requires body-parser middleware)
    console.log('Request Body:', req.body);
    
    // Important: Call next() to pass control to the next middleware
    next();
});

/**
 * Error Handling Middleware
 * This middleware catches and handles errors in the application
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/**
 * Server Configuration
 * The server listens on port 3000 for incoming connections
 */
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});

/**
 * Additional Concepts to Explore:
 * 
 * 1. Route Parameters:
 *    app.get('/users/:id', (req, res) => {
 *        res.send(`User ID: ${req.params.id}`);
 *    });
 * 
 * 2. Query Parameters:
 *    app.get('/search', (req, res) => {
 *        res.send(`Search query: ${req.query.q}`);
 *    });
 * 
 * 3. Static File Serving:
 *    app.use(express.static('public'));
 * 
 * 4. Template Engines:
 *    app.set('view engine', 'ejs');
 * 
 * 5. Authentication Middleware:
 *    const auth = (req, res, next) => {
 *        if (req.headers.authorization) {
 *            next();
 *        } else {
 *            res.status(401).send('Unauthorized');
 *        }
 *    };
 * 
 * 6. Database Integration:
 *    const mongoose = require('mongoose');
 *    mongoose.connect('mongodb://localhost:27017/mydb');
 * 
 * 7. Environment Variables:
 *    require('dotenv').config();
 *    const port = process.env.PORT || 3000;
 * 
 * 8. CORS Handling:
 *    const cors = require('cors');
 *    app.use(cors());
 * 
 * 9. File Uploads:
 *    const multer = require('multer');
 *    const upload = multer({ dest: 'uploads/' });
 * 
 * 10. Rate Limiting:
 *     const rateLimit = require('express-rate-limit');
 *     const limiter = rateLimit({
 *         windowMs: 15 * 60 * 1000,
 *         max: 100
 *     });
 *     app.use(limiter);
 */