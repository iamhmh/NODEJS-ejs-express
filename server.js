const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db');

connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Listening on port 3000');
});