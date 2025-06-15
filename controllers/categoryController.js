const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;
  const category = await Category.create({ name, slug });
  res.status(201).json(category);
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
