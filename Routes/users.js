const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const  db = require('../models/db');

router.get('/login', userController.login);
router.post('/authenticate', userController.authenticate);
router.get('/admin/register', userController.register);
router.post('/admin/register', userController.registerStaff);
router.get('/view-blood-bank', userController.getDonationHistory);
router.get('/donation-history', async (req, res) => {
  try {
      // Fetch donor details from the database using promises
      const [results, fields] = await db.query('SELECT * FROM donors');

      // Check if there are any donors
      if (results.length === 0) {
          return res.render('donation-history', { donors: [] });
      }

      // Render the page and pass the donor data
      res.render('donation-history', { donors: results });
  } catch (error) {
      console.error('Error fetching donor data:', error);
      res.status(500).send('Internal Server Error');
  }
});
router.post('/admin/staff/update/:id', async (req, res) => {
  const staffId = req.params.id;
  const { name, role, contact } = req.body;

  try {
    await db.query(
      'UPDATE staff SET name = ?, role = ?, contact = ? WHERE staff_id = ?',
      [name, role, contact, staffId]
    );
    res.redirect('/users/admin/staff'); // Redirect to the staff management page
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle donation form submission and record the donation
router.post('/save-donation', (req, res) => {
    const { donorName, bloodType, gender, contactInfo, donationDate } = req.body;
  
    // SQL query to insert data into the database
    const query = `
      INSERT INTO donors (donor_name, blood_type, gender, contact, dob)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(query, [donorName, bloodType, gender, contactInfo, donationDate], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error recording donation');
      }
      
      // Send a success message
      res.render('record-donation'); 
    });
  });
  router.get('/admin/staff', async (req, res) => {
    try {
      const staffList = await userController.getStaffList();
      res.render('manageStaff', { staffList });
    } catch (error) {
      console.error('Error fetching staff:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  // Update Staff Route
  router.post('/admin/staff/update:id', async (req, res) => {
    const staffId = req.params.id;
    const { name, role, contact } = req.body;

    try {
      await db.query(
        '   UPDATE staff SET name = ?, role = ?, contact = ? WHERE staff_id = ?',
        [name, role, contact, staffId]
      );
      res.redirect('/users/admin/staff'); // Redirect to the staff management page
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/admin/staff/delete/:id', async (req, res) => {
    const staffId = req.params.id;

    try {
      await db.query('DELETE FROM staff WHERE staff_id = ?', [staffId]);
      res.redirect('/users/admin/staff'); // Redirect to the staff management page
    } catch (error) {
      console.error('Error deleting staff:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  // Edit Staff Route
  router.get('/admin/staff/edit/:id', async (req, res) => {
    const staffId = req.params.id; // Access the dynamic staff ID from the URL
    try {
      // Fetch staff details from the database using the staffId
      const [staff] = await db.query('SELECT * FROM staff WHERE staff_id = ?', [staffId]);
  
      if (!staff) {
        return res.status(404).send('Staff member not found');
      }
  
      // Render the edit page and pass the staff data
      res.render('editStaff', { staff });
    } catch (error) {
      console.error('Error fetching staff data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  module.exports = router;