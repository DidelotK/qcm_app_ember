'use strict';
const router = require('express').Router();
const bodyParser = require('body-parser');

const parseUrl = bodyParser.urlencoded({extended: true});
//var parseJson = bodyParser.json({ type: 'application/*+json' });

module.exports = auth => {
  router.post('/login', parseUrl, auth.authenticate);

  router.post('/logout', parseUrl, auth.isAuthenticated, (req, res) => {
    req.user.token = undefined;
    req.user.save();
    res.status(200).end();
  });

  return router;
};
