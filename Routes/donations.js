const express = require('express');
const router = express.Router();
const donationController = require('../Controllers/donationController');

router.post('/record', donationController.recordDonation);
router.get('/', donationController.viewBlood);

module.exports = router;
