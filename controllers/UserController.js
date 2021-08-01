const User = require('../models/User');
const express = require('express');


const UserController = {
    async register(req,res) {
        try {
            const user = await User.create(req.body)
            const { username } = req.body;
            res.render('profile', {
                user:user,
                id: user.id,
                message: '¡Bienvenido a la comunidad! Tómate unos minutos para personalizar tu perfil.'
            })

        } catch (error) {
            console.error(error);
            res.render('register', {error})
        }
    }, 
    async getAll(req,res){
        try {
            const users = await User.find()
            if(!req.user){
                res.render('users', 
                {
                    users: users
                })
            } else {
                res.render('users', 
                {
                    users: users,
                    user: req.user
                })
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Ha habido un problema tratando de mostrar los usuarios", error})
        }
        
    },
    async getById(req,res) {
        try {
            const user = await User.findById(req.params.id);
            res.render('profile', 
                {
                    user: user
                })
        } catch (error) {
            console.error(error);
            res.render('login')
        }
        
    },
    async getByEmail(req,res) {
        try {
            const user = await User.findOne({email:req.params.email});
            if(!user){
                return res.status(204).send();
            }
            res.send(user);
    
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Ha habido un problema tratando de buscar al usuario indicado", error})
        }
        
    },
    async update(req,res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true //<- esto hace que el usuario que se devuelve sea el actualizado y no el original
            });
            res.render('profile', 
                {
                    user: user
                })
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Ha habido un problema tratando de actualizar al usuario", error})
        }
    }, 
    async delete(req,res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id) 
            res.redirect('/')
        } catch (error) {
            console.error(error);
            res.render('/', {error: 'Ha habido un problema tratando de eliminar la cuenta.'})
        }
    }
}



module.exports = UserController;