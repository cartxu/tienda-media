const Compra = require('../models/Compra');
const Product = require('../models/Product');
const User = require('../models/User')
const express = require('express');

const CompraController = {
    async new(req,res) {
        try {
            const sold = { sold: true };
            const compra = await Compra.create(req.body);
            const products = await Product.find()
            console.log(compra)
            const productUpdate = await Product.findOneAndUpdate(req.params.title, sold,{
                new: true
              });
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
        } catch (error){
            console.error(error);
            res.render('products', 
            {
                message: 'Ha habido un error al tramitar la compra.'
            })
        }
    }, async getAllCompras(req,res){
        try{
            const compras = await Compras.find()
            const products = await Product.find()
            if(!req.user){
                res.render('compras', {
                    compras: compras,
                    products: products,
                })
            } else {
                res.render('compras', 
                {
                    compras: compras,
                    user: req.user,
                    username: req.user.username,
                    products: products,
                })
            }
        } catch(error){
            console.error(error);
            res.render('compras', {
                message: 'No hay compras todavía.'
            })
        }
    }
}

module.exports = CompraController;