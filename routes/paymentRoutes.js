const express = require('express');
const router = express.Router();

const {
  createStripePaymentIntent,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-intent', protect, createStripePaymentIntent);

module.exports = router;
