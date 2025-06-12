const Product = require('../models/Product');

//create product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    date: product,
  });
};

//Get all products (with filters)
exports.getProducts = async (req, res) => {
  const queryObj = { ...req.query };

  //filtering
  const excludeFields = ['sort', 'page', 'limit', 'search'];
  excludeFields.forEach((field) => delete queryObj[field]);

  //search
  if (req.query.search) {
    queryObj.name = { $regex: req.query.search, $options: 'i' };
  }

  let query = Product.find(queryObj);

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const products = await query;

  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
};

//get product by id
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error('Product not found');
  res.status(200).json({ success: true, data: product });
};

//update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new Error('product not found');
  res.status(200).json({ success: true, data: product });
};

//delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new Error('product not found');
  res.status(200).json({ success: true, message: 'product deleted' });
};
