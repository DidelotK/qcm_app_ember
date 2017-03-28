'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const teachingUnitSchema = Schema({
  name: {type: String, required: true, unique: true},
});

const model = mongoose.model('Unit', teachingUnitSchema);

module.exports = {
  schema: teachingUnitSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/units/{id}`,
      relationship: `${self}/api/units/{ownerId}/relationships/{path}`
    }
  }
};
