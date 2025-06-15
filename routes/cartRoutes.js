const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);

module.exports = router;
