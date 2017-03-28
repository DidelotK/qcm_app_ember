'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const responseSchema = Schema({
  user: { type: ObjectId, ref: 'User', required: true},
  examination: { type: ObjectId, ref: 'Examination', required: true},
  responses: [{type: String}]
});

const model = mongoose.model('Response', responseSchema);

module.exports = {
  schema: responseSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/responses/{id}`,
      relationship: `${self}/api/responses/{ownerId}/relationships/{path}`
    }
  }
};
