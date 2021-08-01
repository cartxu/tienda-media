const Product = require('../models/Product');
const express = require('express');

const ProductController = {
    async new(req,res) {
        try {
            const product = await Product.create(req.body)
            res.redirect('/')

        } catch (error) {
            console.error(error);
            res.render('products', 
            {
                message: 'Ha habido un error tratando de añadir el producto.'
            })
        }
    }, 
    async getAllProducts(req,res){
        try {
            const products = await Product.find()
            if(!req.user){
                res.render('products', 
                {
                    products: products
                })
            } else {
                res.render('products', 
                {
                    products: products,
                    user: req.user,
                    username: req.user.username
                })
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({message: "There was a problem trying to show the products", error})
        }
        
    },
    async getProductById(req,res) {
        try {
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(204).send();
            } 
            if(req.user.username === product.owner) {
                res.render('newproduct', {
                    product: product,
                    user: req.user,
                    message: 'Actualiza tu producto'
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "There was a problem trying to find the product BY ID", error})
        }
        
    },
    async updateProduct(req,res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true //<- esto hace que el producto que se devuelve sea el actualizado y no el original
                
            });
            res.redirect('/products')
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "There was a problem trying to update the product UPDATE", error})
        }
    }, async deleteProduct(req,res) {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.redirect('/products') 
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "There was a problem trying to delete this product DELETE", error})
        }
    }, async searchProduct(req,res) {
        try {
            const products = await Product.find({title:{"$regex":req.query.title, "$options": "i"}});
            if(!req.user){
                res.render('products', 
                {
                    products: products
                })
            } else {
                res.render('products', 
                {
                    products: products,
                    user: req.user,
                    username: req.user.username
                })
            }
    
        } catch (error) {
            console.error(error);
            res.render('products', 
            {
                message: 'No hemos encontrado ningún producto relacionado con tu búsqueda.'
            })
        }
        
    }, async orderProducts(req,res) {
        try {
            let products;
            if(req.query.order === 'caro') {
                products = await Product.find({}).sort({'price':-1})
            } else if (req.query.order === 'barato') {
                products = await Product.find({}).sort({'price':1})
            } else if(req.query.order === 'titulo'){
                products = await Product.find({}).sort({'title':1})
            }

            if(!req.user){
                res.render('products', 
                {
                    products: products
                })
            } else {
                res.render('products', 
                {
                    products: products,
                    user: req.user,
                    username: req.user.username
                })
            }

        } catch (error) {
            console.error(error)
            res.render('products')
        }
    }, async getProductsByOwner(req, res) {
        try {
            const products = await Product.find({owner:req.params.owner});
            if(!req.user){
                res.render('products', 
                {
                    products: products
                })
            } else {
                res.render('products', 
                {
                    products: products,
                    user: req.user,
                    username: req.user.username
                })
            }
        } catch (error) {
            console.error(error)
            res.render('products')
        }
    }, async getProductsByCategory(req, res) {
        try {
            const products = await Product.find({category:req.params.category});
            if(!req.user){
                res.render('products', 
                {
                    products: products
                })
            } else {
                res.render('products', 
                {
                    products: products,
                    user: req.user,
                    username: req.user.username
                })
            }
        } catch (error) {
            console.error(error)
            res.render('products')
        }
    }

}

module.exports = ProductController;