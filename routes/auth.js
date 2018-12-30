var express = require('express');
var authRouter = express.Router();
var passport = require('passport');

authRouter.get('/github', passport.authenticate('github'));

authRouter.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = authRouter;
