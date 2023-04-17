const express = require('express');
const app = express();
const connectDB = require('./db');

connectDB();

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Listening on port 3000');
});