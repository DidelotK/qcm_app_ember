'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const classSchema = Schema({
  name: {type: String, required: true},
  students: [{ type: ObjectId, ref: 'User'}]
});

const model = mongoose.model('Class', classSchema);

module.exports = {
  schema: classSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/classes/{id}`,
      relationship: `${self}/api/classes/{ownerId}/relationships/{path}`
    },
    beforeSave: (resource, req, res, superFn) => { // jshint ignore:line
      return resource;
    }
  }
};
