const express = require('express');
const session=require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();//enviorment variable loaded from .env file into the folder

const users=require('./user.js');
const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } //Set to true if using HTTPS //false mean we can use on http and not https
}))

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    if (bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id; // Store user ID in session
        return res.send('Login successful');
    } else {
        return res.status(401).send('Invalid email or password');
    }
}