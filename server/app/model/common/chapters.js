'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const chapterSchema = Schema({
  name: {type: String, required: true},
  belongsto: {type: ObjectId, ref: 'Course', required: true}
});

const model = mongoose.model('Chapter', chapterSchema);

module.exports = {
  schema: chapterSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/chapters/{id}`,
      relationship: `${self}/api/chapters/{ownerId}/relationships/{path}`
    }
  }
};
