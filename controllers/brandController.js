const Brand = require('../models/Brand');

exports.createBrand = async (req, res) => {
  const { name, logo } = req.body;
  const brand = await Brand.create({ name, logo });
  res.status(201).json(brand);
};

exports.getAllBrands = async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
};
