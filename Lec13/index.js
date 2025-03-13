


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
    console.log('✅ Connected to MySQL database');
});

// Sample Data (For Testing Without Database)
const myFriends = [
    { id: 1, name: 'John Doe', email: 'john@example.com', contact: 37890 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', contact: 78901 },
    { id: 3, name: 'Bob Doe', email: 'bob@example.com', contact: 89012 }
];

// Joi Validation Schema
const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    mobile: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required()
});

// ✅ **GET: Retrieve All Friends**
app.get('/friends', (req, res) => {
    res.json(myFriends);
});

// ✅ **GET: Retrieve a Single Friend by ID**
app.get('/friends/:id', (req, res) => {
    const paramId = parseInt(req.params.id);
    const friend = myFriends.find(friend => friend.id === paramId);

    if (!friend) {
        return res.status(404).json({ error: "❌ Friend not found" });
    }
    return res.json(friend);
});

// ✅ **POST: Add a New Friend**
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
            return res.status(500).json({ error: '❌ Database error', details: err.message });
        }
        res.status(201).json({ id, name, email, mobile });
    });
});

// ✅ **PATCH: Update a Friend**
app.patch('/friends/:id', (req, res) => {
    const paramId = parseInt(req.params.id); // Convert ID from URL to number
    const index = myFriends.findIndex((frnd) => frnd.id === paramId);

    if (index === -1) {
        return res.status(404).json({ error: '❌ Friend not found' });
    }

    // Update friend details, keeping old values if not provided
    myFriends[index] = { ...myFriends[index], ...req.body };

    return res.json({ message: '✅ Friend updated successfully', friend: myFriends[index] });
});

// // ✅ **DELETE: Remove a Friend**
// app.delete('/friends/:id', (req, res) => {
//     const paramId = parseInt(req.params.id);
//     const index = myFriends.findIndex(friend => friend.id === paramId);

//     if (index === -1) {
//         return res.status(404).json({ error: "❌ Friend not found" });
//     }

//     myFriends.splice(index, 1);
//     return res.json({ message: "✅ Friend deleted successfully" });
// });

// ✅ **Server Listening**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

