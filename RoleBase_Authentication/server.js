const path = require('path');
const express = require('express');            // Import express
const jwt = require('jsonwebtoken');           // Import jsonwebtoken
const dotenv = require('dotenv');              // Load environment variables
const users = require('./user');               // Your user data
const protectedRoutes = require('./protected'); // Your protected router

dotenv.config(); // Initialize dotenv

const app = express();

// 1. Parse JSON bodies
app.use(express.json());

// 2. Serve all static files (HTML, CSS, JS) from project root
app.use(express.static(path.join(__dirname)));

// 3. Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// 4. Mount protected routes for profile, admin, editor
app.use('/', protectedRoutes);

// 5. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} — http://localhost:${PORT}/`
  );
});
