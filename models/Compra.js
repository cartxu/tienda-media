const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        trype: String,
        required: true,
        unique:true,
    },
    username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Compra = mongoose.model('Compra', CompraSchema);

module.exports = Compra;