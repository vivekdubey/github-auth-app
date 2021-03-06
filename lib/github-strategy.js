var passport = require('passport');
var Strategy = require('passport-github').Strategy;
module.exports = function (){
  passport.use(new Strategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: require('../config')().githubCallbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));
}
