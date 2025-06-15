const express = require('express');
const router = express.Router();
const { createBrand, getAllBrands } = require('../controllers/brandController');

router.post('/', createBrand);
router.get('/', getAllBrands);

module.exports = router;
