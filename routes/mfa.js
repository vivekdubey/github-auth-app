const mfaRouter = require('express').Router();
const request = require('request');
const mfa = require('../lib/2fa');
const secret = mfa.secret()

mfaRouter.get('/',
require('connect-ensure-login').ensureLoggedIn('/login'),
function (req, res) {
  let url = mfa.otpUrl(secret.base32,req.user.username)
  console.log( url)
  res.render('mfa', {otpUrl: url});
});

mfaRouter.post('/verify', function (req, res) {
  let token = req.body.token;
  let tokenVerified = mfa.verifyToken(token, secret.base32)
  let message = {verified: false}
  if(tokenVerified){
    message.verified = true
  }
  res.render('verify', message);
});

module.exports = mfaRouter;
