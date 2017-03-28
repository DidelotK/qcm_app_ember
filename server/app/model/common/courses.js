'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const courseSchema = Schema({
  name: {type: String, required: true},
  belongsto: { type: ObjectId, ref: 'Unit' , required: true}
});

const model = mongoose.model('Course', courseSchema);

module.exports = {
  schema: courseSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/courses/{id}`,
      relationship: `${self}/api/courses/{ownerId}/relationships/{path}`
    }
  }
};
