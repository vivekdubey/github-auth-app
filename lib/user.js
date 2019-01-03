const fs = require('fs');
const userDataFile = require('../config')().userDataFile;

var readUserDataFile = function (){
  return JSON.parse(fs.readFileSync(userDataFile));
}

var writeUserDataFile = function (userData){
  fs.writeFileSync(userDataFile, JSON.stringify(userData, null, 2));
}

var ifUserExists = function (userName) {
  return userName in readUserDataFile();
}

var addUser = function (userName, secret) {
  let userData = readUserDataFile();
  userData[userName] = secret;
  writeUserDataFile(userData);
}

module.exports = {
  exists: ifUserExists,
  add: addUser
}
