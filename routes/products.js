const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth');


router.post('/', isAuthenticated, ProductController.new);
router.get('/', ProductController.getAllProducts);
router.get('/add', isAuthenticated, (req, res) => {
    res.render('newproduct', 
    {
        user : req.user,
        message: `¿Algo que vender?`
    })
})
router.get('/search', ProductController.searchProduct);
router.get('/order', ProductController.orderProducts);
router.get('/:id', ProductController.getProductById);
router.get('/user/:owner', ProductController.getProductsByOwner);
router.get('/cat/:category', ProductController.getProductsByCategory);
router.get('/edit/:id', ProductController.getProductById);
router.put('/:id', isAuthenticated, ProductController.updateProduct);
router.delete('/:id', isAuthenticated, ProductController.deleteProduct);


module.exports = router;