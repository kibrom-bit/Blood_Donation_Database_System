const db = require('../models/db');

// Record donation
exports.recordDonation = (req, res) => {
  const { donor_name, blood_group, gender, age } = req.body;
  db.query('INSERT INTO donations (donor_name, blood_group, gender, age) VALUES (?, ?, ?, ?)', [donor_name, blood_group, gender, age], (err, result) => {
    if (err) return res.status(500).send('Error recording donation');
    res.send('Donation recorded successfully');
  });
};

// View available blood
// Assuming this is the problematic viewBlood function
exports.viewBlood = async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM donations', [req.session.user.username]);
  
      // Continue with your code here...
      res.render('donations', { donations: results });
    } catch (err) {
      console.error('Error fetching donations:', err);
      res.status(500).send('Internal server error');
    }
  };
  
