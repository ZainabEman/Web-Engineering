const express= require('express');
const passport= require('passport');
const session= require('express-session');
const mongoose= require('mongoose');
const dotenv= require('dotenv').config();
dot.env.config();
const app= express();





mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'));

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
  