const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [{
    id:1,
    email:'abc@abc.com',
    password:bcrypt.hashSync('password', 10),
}];

module.exports = users;