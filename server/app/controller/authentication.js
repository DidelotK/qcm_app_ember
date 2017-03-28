'use strict';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const BluebirdPromise = require('bluebird');
const verify = BluebirdPromise.promisify(jwt.verify);
const dbUsers = require('../model/common/users');

module.exports = {
  authenticate(req, res) {
    const token = jwt.sign({ token: uuid.v4() }, process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES });
    dbUsers.actions.login(req.body.username, req.body.password, token)
      .then(doc => {
        if (doc) {
          res.status(200).send({
            account_id: doc.id,
            access_token: token
          });
        } else {
          res.status(400).send({ error: 'wrong_credentials' });
        }
      }).catch(err => res.status(400).send({ error: err }));
  },
  isAuthenticated(req, res, next) {
    verify(req.body.token, process.env.TOKEN_SECRET)
      .then(() => {
        return dbUsers.actions.getUserByToken(req.body.token);
      })
      .then(doc => {
        req.user = doc;
        next();
      })
      .catch(err => {
        res.status(401).send({ error: err });
      });
  }
};
