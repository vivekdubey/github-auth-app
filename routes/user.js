var express = require('express');
var userRouter = express.Router();


userRouter.get('/',
  require('connect-ensure-login').ensureLoggedIn('/login'),
  function(req, res) {
    res.render('home', { user: req.user });
  });

userRouter.get('/login',
  function(req, res){
    res.render('login');
});

userRouter.get('/profile',
  require('connect-ensure-login').ensureLoggedIn('/login'),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = userRouter;
