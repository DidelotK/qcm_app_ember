'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const testSchema = Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  numberofquestion: {type: Number, required: true},
  unit: { type: ObjectId, ref: 'Unit', required: true},
  course: { type: ObjectId, ref: 'Course', required: true},
  chapters: [{ type: ObjectId, ref: 'Chapter'}],
  exams: [{ type: ObjectId, ref: 'Examination' }],
  userstested: [{ type: ObjectId, ref: 'User'}],
  launchedat: {type: Date},
  createdat: {type: Date},
  creatorid: {type: ObjectId, ref: 'User'}
});

const model = mongoose.model('Test', testSchema);

module.exports = {
  schema: testSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/tests/{id}`,
      relationship: `${self}/api/tests/{ownerId}/relationships/{path}`
    },
    beforeSave: (resource, req, res, superFn) => { // jshint ignore:line
      if (!resource._relationships.userstested.linkage.value ||
        resource._relationships.userstested.linkage.value.length === 0) {
        res.status(400).send({errors:
          [{status: '400', title: 'A test need at least one student'}]
        });
        return null;
      }
      if (!resource._relationships.chapters.linkage.value ||
        resource._relationships.chapters.linkage.value.length === 0) {
        res.status(400).send({errors:
          [{status: '400', title: 'A test need at least one chapter'}]
        });
        return null;
      }
      if (!resource._attrs.launchedat && resource._attrs.createdat) {
        resource._attrs.launchedat = Date.now();
      }
      if (!resource._attrs.createdat) {
        resource._attrs.createdat = Date.now();
      }

      return resource;
    }
  }
};
