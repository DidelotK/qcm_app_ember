const jwt = require('jsonwebtoken');
//var uuid = require('uuid');
const BluebirdPromise = require('bluebird');
const verify = BluebirdPromise.promisify(jwt.verify);

module.exports = {
  isAuthenticated(token) {
    return verify(token, process.env.TOKEN_SECRET)
      .then(() => true)
      .catch(() => false);
  },
  isCurrentUser(token, target) {
    console.log(token, target);
  }
};
