'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const helpers = require('../helpers');
// const winston = require('winston');

const self = process.env.SERVER_IP;

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum: ['admin','professor','student']},
  class: {type: ObjectId, ref: 'class'},
  givencourse: {type: ObjectId, ref: 'course'}
});

const model = mongoose.model('User', userSchema);

module.exports = {
  schema: userSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/users/{id}`,
      relationship: `${self}/api/users/{ownerId}/relationships/{path}`
    }
    // beforeRender(resource, req) {
    //   const token = req.headers.authorization.replace('Bearer ', '');
    //   if (helpers.isAuthenticated(token)) {
    //     winston.log('trace', 'auth');
    //TODO not admin use current user
    //     if (resource._attrs.token !== token) {
    //       resource.removeAttr('email');
    //     }
    //   }
    //
    //   resource.removeAttr('token');
    //   resource.removeAttr('password');
    //   return resource;
    // }
  },
  actions: {
    login(email, password, token) {
      return model.findOneAndUpdate({ email: email, password: password },
          { token: token }).exec();
    },
    getUserByToken(token) {
      return model.findOne({ token: token }).exec();
    }
  }
};
