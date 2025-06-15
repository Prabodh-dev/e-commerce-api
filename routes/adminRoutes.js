const express = require('express');
const router = express.Router();

const { getAllUsers, getAllOrders } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin-protected routes
router.get('/users', protect, admin, getAllUsers);
router.get('/orders', protect, admin, getAllOrders);

module.exports = router;
