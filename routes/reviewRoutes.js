const express = require('express');
const router = express.Router();

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/products/:productId/reviews', protect, createReview);
router.get('/reviews', getAllReviews);
router.patch('/reviews/:id', protect, updateReview);
router.delete('/reviews/:id', protect, deleteReview);

module.exports = router;
