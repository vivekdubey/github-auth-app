module.exports = function () {
  return {
    port: 3000,
    githubCallbackURL: "http://localhost:3000/auth/github/callback",
    userDataFile: require('path').resolve('./data/users.json'),
    cookieMaxAge: 300000
  }
}
