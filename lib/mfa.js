const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const encoding = 'base32';
var otpUrl = function (secret, label) {
  return speakeasy.otpauthURL({secret: secret, encoding: encoding, label: label});
}

var getSecret = function() {
  return speakeasy.generateSecret().base32;
}

var verifyToken = function(userToken, secret){
  return speakeasy.totp.verify({ secret: secret, encoding: encoding, token: userToken });
}

module.exports = {
  otpUrl: otpUrl,
  getSecret: getSecret,
  verifyToken: verifyToken
}
