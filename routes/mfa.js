const mfaRouter = require('express').Router();
const request = require('request');
const mfa = require('../lib/2fa');

mfaRouter.get('/',
require('connect-ensure-login').ensureLoggedIn('/login'),
function (req, res) {
  req.session.mfa = {secret: mfa.secret().base32}
  let url = mfa.otpUrl(req.session.mfa.secret,req.user.username)
  console.log(url)
  res.render('mfa', {otpUrl: url});
});

mfaRouter.post('/verify', function (req, res) {
  res.render('verify', {verified: mfa.verifyToken(req.body.token, req.session.mfa.secret)})
});

module.exports = mfaRouter;
