const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router
  .route('/')
  .post(productController.createProduct)
  .get(productController.getProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
