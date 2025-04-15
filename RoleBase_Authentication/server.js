const app=express();
const users=require('./user');
app.use(express.json());
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username:user.username, userrole:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});