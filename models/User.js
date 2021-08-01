const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    bio: {
        type: String,
        default: '“Sólo tú puedes decidir qué hacer con el tiempo que se te ha dado”'
    },
    avatar: {
        type: String,
        default: '/images/unknown.png'
    },
    member: {
        type: String,
        default: 'Hobbit',
        enum: ['Hobbit', 'Hombre', 'Enano', 'Elfo', 'Orco', 'Mago', 'Señor Oscuro']
    },
    purchases: Array
});

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        } else {
            callback(err, same);
        }
    })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;