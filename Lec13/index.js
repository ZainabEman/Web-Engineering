// const express = require('express');
// const JOI=require('joi');
// const { v4: uuidv4 } = require('uuid');


// const schema= JOI.object({
//     name:JOI.string().min(3).max(20).required(),
//     mobile:JOI.number().required().min(11),//.pattern()
//     email:JOI.string(),//.pattern()
// })


// const app = express();

// // Middleware to parse JSON request body
// app.use(express.json());

// const myFriends = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', contact: 37890 },
//     { id: 2, name: 'Jane Doe', email: 'jane@example.com', contact: 78901 },
//     { id: 3, name: 'Bob Doe', email: 'bob@example.com', contact: 89012 }
// ];

// // Get all friends
// // app.get('/friends', (req, res) => {
// //     return res.json(myFriends);
// // });

// // // Get a friend by ID
// // app.get('/friends/:id', (req, res) => {
// //     const id = parseInt(req.params.id);  // Convert string ID to number
// //     const friend = myFriends.find(friend => friend.id === id);

// //     if (!friend) {
// //         return res.status(404).json({ error: "Friend not found" });
// //     }
// //     return res.json(friend);
// // });

// // Add a new friend
// // app.post('/friends', (req, res) => {
// //     const { name, email, contact } = req.body;

// //     // Validate request body
// //     if (!name || !email || !contact) {
// //         return res.status(400).json({ error: "All fields (name, email, contact) are required" });
// //     }

// //     const friend = {
// //         id: uuidv4(),
// //         name,
// //         email,
// //         contact
// //     };

// //     myFriends.push(friend);
// //     return res.status(201).json(friend);
// // });

// // Root route
// // app.get('/', (req, res) => {
// //     res.send('I am active');
// // });


// app.post('/friends', (req, res) => {
//     const result=schema.validate(req.body);
//     res.send(result);
// });

// // Start the server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

require('dotenv').config(); // Load environment variables
const express = require('express');
const mysql = require('mysql2');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// Database Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'lec13'
});
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Joi Validation Schema
const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    mobile: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required()
});

// POST: Add a new friend
app.post('/friends', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, mobile } = req.body;
    const id = uuidv4();

    const query = 'INSERT INTO friends (id, name, email, mobile) VALUES (?, ?, ?, ?)';
    connection.query(query, [id, name, email, mobile], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ id, name, email, mobile });
    });
});

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



