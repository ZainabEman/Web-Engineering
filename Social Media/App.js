const express= require('express');
const passport= require('passport');
const session= require('express-session');
const mongoose= require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI,require('/Routes/auth.js'))

app.use(session({secret:process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/profile', (req,res)=>{
   if (!req.isAuthenticated()){
       return res.redirect('/');
       res.render('profile', {user: req.user});

   }}
  );

  app.get('/logout', (req,res)=>{
    req.logout((err)=>{
        if (err) {return next(err);}
        res.redirect('/');
    });
  });
  app.listen(3000, ()=>console.log('Server is running on port 3000'));
  