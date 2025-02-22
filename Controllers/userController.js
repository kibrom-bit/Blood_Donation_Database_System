const db = require('../models/db');
const bcrypt = require('bcryptjs');

// Register user (admin only can register staff)
exports.register = (req, res) => {
  console.log(req.session.user);
  if (req.session.user && req.session.user.role === 'Admin') {
    res.render('register');
  } else {
    res.status(403).send('Access Denied');
  }
};

// Handle staff registration
exports.registerStaff = async (req, res) => {
  const { username, password, role, staff_name, contact } = req.body;

  try {
    // Check if the username already exists
    const [userExist] = await db.query('SELECT * FROM staff WHERE username = ?', [username]);
    if (userExist.length > 0) {
      return res.status(400).send('Username already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new staff into the database
    const [result] = await db.query('INSERT INTO staff (username, password, role, created_at) VALUES (?, ?, ?, NOW())', [username, hashedPassword, role]);

    // Redirect to staff management page or show success message
    res.redirect('/users/admin/register');
  } catch (err) {
    console.error('Error registering staff:', err);
    res.status(500).send('Internal server error');
  }
};


// Login function
exports.login = (req, res) => {
  res.render('login');
};


exports.authenticate = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use promise-based query for getting user details
    const [results] = await db.query('SELECT * FROM staff WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = results[0];

    // Compare password using bcrypt
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.user = { username: user.username, role: user.role };
      // Role-based redirection
      if (user.role === 'Admin') {
        return res.redirect('/pages/admin');
      } else if (user.role === 'blood_accumulator') {
        console.log('Redirecting to blood accumulator');
        return res.redirect('/pages/blood_accumulator');
      } else if (user.role === 'blood_bank') {
        return res.redirect('/pages/blood_bank');
      }
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error('Error during authentication:', err);
    return res.status(500).send('Internal server error');
  }
};
// Assuming you are using mysql2's promise-based API
exports.getDonationHistory = async (req, res) => {
  try {
    const [results] = await db.query('SELECT donor_name, blood_type, contact, dob FROM donors');
    
    // Render the donation history page and pass the data to the view
    res.render('donation-history', { donors: results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving donation history');
  }
};
exports.getStaffList = async function () {
  try {
    const [rows] = await db.query('SELECT staff_id, username, role FROM staff');
    return rows; // Returns the staff list as an array
  } catch (err) {
    console.error('Error fetching staff list:', err);
    throw err; // Propagates the error
  }
};

