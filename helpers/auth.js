const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } 
    req.flash('error', 'No está autorizado');
    res.redirect('/login');
};

module.exports = helpers;