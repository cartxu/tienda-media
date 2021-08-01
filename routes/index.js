const express = require('express');
const {
  isAuthenticated
} = require('../helpers/auth');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Product = require('../models/Product');
require('../config/mongoose');

router.get('/', function(req, res) {
  res.redirect('/products')
})

module.exports = router;