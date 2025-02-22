const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const db = require('./models/db');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sessionSecret = process.env.SESSION_SECRET;
app.use(session({
  secret: sessionSecret, 
  resave: false,
  saveUninitialized: true
}));


// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoutes = require('./Routes/index');
const userRoutes = require('./Routes/users');
const donationRoutes = require('./routes/donations');
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/pages',indexRoutes);
app.get('/', (req, res) => {
  res.render('index'); // Assumes you have an 'index.ejs' file in the 'views' folder
});
app.get('/logout', (req, res) => {
  res.render('index'); // Assumes you have an 'index.ejs' file in the 'views' folder
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
