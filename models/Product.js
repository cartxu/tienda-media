const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
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
        default: 'as new',
        enum: ['as new', 'used but good', 'small damages', 'need repair']
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
        default: false
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;