

const express = require('express');
const session=require('express-session');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();//enviorment variable loaded from .env file into the folder
const jwt = require('jsonwebtoken');
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
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET_key,
        { expiresIn: '1h' } // Token expiration time
    );
}

app.post('/login',  (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid =  bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }//authentication completed now we will not maintain env key instead we will maintain jwt token
    const token = generateToken(user); // Generate a token for the user
    return res.status(200).json({ message: 'Login successful', token });
});
app.post('/profile', (req, res) => {
    const authHeader=req.headers.authorization;
    if(!authHeader) {
        return res.status(400).json({ message: 'No token provided' });
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_key);
        return res.status(200).json({ message: 'Profile data', user: decoded });
    }catch(err){
        return res.status(401).json({ message: 'Invalid token' });
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});