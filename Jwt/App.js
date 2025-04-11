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
}));

function generateToken(user) {
    const token = bcrypt.hashSync(userId.toString(), 10); // Hash the user ID to create a token
    return jwt.sign(
        id:user.id,
        email:user.email,
        process.env.JWT_SECRET_key,
        expires:'1h' // Token expiration time
    );
}