const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        default: 'como nuevo',
        enum: ['como nuevo', 'en buen estado', 'pequeños daños', 'necesita reparación']
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: { 
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'utensilios',
        enum: ['joyas', 'animales', 'utensilios', 'armas', 'decoracion', 'ropa', 'complementos']
    },
    sold: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;