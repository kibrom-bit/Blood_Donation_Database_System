const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Use your database password here
  database: 'blood_donation_system'  // Replace with your database name
});

// Use the promise-based API
const db = connection.promise();

// Check connection status
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = db;
