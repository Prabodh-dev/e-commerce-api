const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');

// /api/reviews
router.route('/reviews').get(getAllReviews);

// /api/reviews/:id
router
  .route('/reviews/:id')
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

// /api/products/:productId/reviews
router.route('/products/:productId/reviews').post(protect, createReview);

module.exports = router;
