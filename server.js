const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db');
const { adminAuth, userAuth } = require('./middleware/auth');

connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

//route principale
app.get('/', (req, res) => res.render('home'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

app.get('/admin', adminAuth, (req, res) => res.render('admin'));
app.get('/user', userAuth, (req, res) => res.render('user'));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});