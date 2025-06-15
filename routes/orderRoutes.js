const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.patch('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
