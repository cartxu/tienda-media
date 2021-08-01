const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'username'
}, async (username, password, done) => {
    const user = await User.findOne({
        username: username
    });
    if (!user) {
        return done(null, false, 
            req.flash('message', 'El usuario no es correcto.'));
    } else {
        await user.isCorrectPassword(password, (err, result) => {
            if (result) {
                return done(null, user);
            } else {
                return done(null, false, req.flash('message', 'Contraseña incorrecta.'))
            }
        });
    }
}));

// passport.use()

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})