const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isAuthenticated } = require('../helpers/auth');

router.get('/', UserController.getAll);
router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/newuser', UserController.register);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('login');
});

router.get('/:id', UserController.getById);
router.get('/email/:email', UserController.getByEmail);
router.put('/:id', isAuthenticated, UserController.update);
router.delete('/:id', isAuthenticated, UserController.delete);


module.exports = router;
