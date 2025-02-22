const express = require('express');
const router = express.Router();
  
  // Routes for the different user dashboards
router.get('/admin', (req, res) => {
  if (req.session.user && req.session.user.role === 'Admin') {
    res.render('admin'); // Replace with your actual admin dashboard view
  } else {
    res.status(403).send('Unauthorized');
  }
});

router.get('/blood_accumulator', (req, res) => {
  if (req.session.user && req.session.user.role === 'blood_accumulator') {
    res.render('blood_accumulator'); // Replace with your actual blood accumulator dashboard view
  } else {
    res.status(403).send('Unauthorized');
  }
});

router.get('/blood_bank', (req, res) => {
  if (req.session.user && req.session.user.role === 'blood_bank') {
    res.render('blood_bank'); // Replace with your actual blood bank dashboard view
  } else {
    res.status(403).send('Unauthorized');
  }
});
router.get('/record-donation', (req, res) => {
      res.render('record-donation'); // Replace with your actual admin dashboard view
  });

  
module.exports = router;