const Review = require('../models/Review');
const Product = require('../models/Product');

//create review
const createReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, title, comment } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const alreadyReviewed = await Review.findById({
    product: productId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: 'you have already reviewed this product' });
  }

  const review = await Review.create({
    rating,
    title,
    comment,
    user: req.user._id,
    product: productId,
  });

  res.status(200).json(review);
};

//get all reviews
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate('user', 'name')
    .populate('product', 'name price');
  res.status(200).json(reviews);
};

//update review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
};
