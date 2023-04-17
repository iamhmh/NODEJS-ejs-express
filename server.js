const express = require('express');
const app = express();
const connectDB = require('./db');

app.set('view engine', 'ejs');




app.listen(8080, () => {
    console.log('Listening on port 8080');
});