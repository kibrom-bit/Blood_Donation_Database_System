const bcrypt = require('bcryptjs');
const db = require('./models/db'); // Assuming you're using MySQL connection

async function registerAdmin() {
  const username = 'kibrom';  // You can change this based on your needs
  const plaintextPassword = '123123'; // The password you want to set for the admin
  const role = 'Admin'; // Admin role

  // Hash the password using bcrypt
  const saltRounds = 10;  // Adjust the salt rounds for the hashing
  const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);

  // Insert the admin user into the database with the hashed password
  const query = 'INSERT INTO staff (username, password, role) VALUES (?, ?, ?)';
  try {
    await db.query(query, [username, hashedPassword, role]);
    console.log('Admin registered successfully');
  } catch (err) {
    console.error('Error registering admin:', err);
  }
}

// Call the function to register the admin
registerAdmin();
