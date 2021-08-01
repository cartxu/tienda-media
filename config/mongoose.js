const mongoose = require('mongoose');


const mongoUrl = 'mongodb://localhost:27017/ecommerce';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=> console.log('Te has conectado correctamente a la BD de la Tienda Media ¡Wiiii! :)'))
.catch(err => console.error(err))

module.exports = mongoose.connection;