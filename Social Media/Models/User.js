const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    providerID: String,
    provideName: String,
    displayName: String,
    email: String,
});
module.exports = mongoose.model('User', UserSchema);
// This code defines a Mongoose schema for a User model. The schema includes fields for provider ID, provider name, display name, and email. The model is then exported for use in other parts of the application.
// This code is typically used in a Node.js application with MongoDB to manage user data, especially in the context of authentication and user profiles.