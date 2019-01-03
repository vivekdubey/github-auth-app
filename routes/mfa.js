const mfaRouter = require('express').Router();
const request = require('request');
const mfa = require('../lib/mfa');
const user = require('../lib/user');

mfaRouter.get('/',
require('connect-ensure-login').ensureLoggedIn('/login'),
function (req, res) {
  req.user.mfa = { secret: mfa.getSecret() };
  let url = mfa.otpUrl(req.user.mfa.secret, req.user.username);
  console.log(url)
  res.render('mfa', {otpUrl: url});
});

mfaRouter.post('/verify', function (req, res) {
  let userName = req.user.username;
  let secret = req.user.mfa.secret;
  if(mfa.verifyToken(req.body.token, secret)){
    user.add(userName, secret);
    res.render('mfaConfirmation', { message: `Hello ${userName}! MFA registered successfully.`});
  } else {
    res.render('mfaConfirmation', { message: `Hello ${userName}! Something went wrong. Try again.`})
  }
});

module.exports = mfaRouter;
