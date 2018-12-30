const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
var otpUrl = function (secret, label) {
  return speakeasy.otpauthURL({secret: secret, label: label});
}

var getSecret = function() {
  return speakeasy.generateSecret();
}

var verifyToken = function(userToken, secret){
  return speakeasy.totp.verify({ secret: secret, encoding: 'base32', token: userToken });
}

module.exports = {
  otpUrl: otpUrl,
  secret: getSecret,
  verifyToken: verifyToken
}
