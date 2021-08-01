const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');
const Compra = require('../models/Compra');
const { isAuthenticated } = require('../helpers/auth');

router.post('/', isAuthenticated, CompraController.new);
router.get('/', CompraController.getAllCompras);

module.exports = router;