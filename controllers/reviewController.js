const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, title, comment } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ msg: 'You have already reviewed this product' });
  }

  const review = await Review.create({
    rating,
    title,
    comment,
    user: req.user._id,
    product: productId,
  });

  res.status(201).json(review);
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name')
    .populate('product', 'name price');

  res.status(200).json(reviews);
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) return res.status(404).json({ msg: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: 'Not authorized to update' });
  }

  const { rating, title, comment } = req.body;
  review.rating = rating ?? review.rating;
  review.title = title ?? review.title;
  review.comment = comment ?? review.comment;

  await review.save();
  res.status(200).json(review);
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) return res.status(404).json({ msg: 'Review not found' });
  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: 'Not authorized to delete' });
  }

  await review.deleteOne();
  res.status(200).json({ msg: 'Review deleted' });
};

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
