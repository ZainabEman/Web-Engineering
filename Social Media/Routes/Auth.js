const passport = require('passport');
const githubStrategy = require('passport-github').Strategy;
passport.use(new githubStrategy({
clientID: process.env.GITHUB_CLIENT_ID,
clientSecret: process.env.GITHUB_CLIENT_SECRET,
callbackURL: "http://127.0.0.1/auth/callback"
}, (accessToken, refreshToken, profile, done) => {
// Check if the user already exists in the database
findUser(profile, (err, user) => {
if (err) {
    return done(err);
}
if (user) {
    return done(null, user);
}
// If the user doesn't exist, create a new user
createUser(profile, (err, user) => {
if (err) {
    return done(err);
}
if (user) {
    return done(null, user);
}
// If the user couldn't be created, return an error
return done(new Error("User creation failed"));
}
});
// Function to find a user in the database
function findUser(profile, callback) {
    User.findOne({githubId: profile.id}, (err, user) => {
if (err) {
        return callback(err);
    }
if (user) {
        return callback(null, user);
    }
// If the user doesn't exist, return null
return callback(null, null);
}
// Function to create a new user in the database
function createUser(profile, callback) {
    var user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        githubId: profile.id,

        provider: profile.provider,
        providerName: profile.provider,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        // Add any other fields you want to store
    });


const User = require('../Models/user.js');
const dotenv = require('dotenv').config();