'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const questionSchema = Schema({
  question: {type: String, required: true},
  all: [{type: String, required: true}],
  answers: [{type: String, required: true}],
  unit: { type: ObjectId, ref: 'Unit', required: true},
  course: { type: ObjectId, ref: 'Course', required: true},
  chapter: { type: ObjectId, ref: 'Chapter' , required: true},
  difficulty: {type: Number, required: true}
});

const model = mongoose.model('Question', questionSchema);

module.exports = {
  schema: questionSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/questions/{id}`,
      relationship: `${self}/api/questions/{ownerId}/relationships/{path}`
    },
    beforeSave: (resource, req, res, superFn) => { // jshint ignore:line
      if (!resource._attrs.all ||
        resource._attrs.all.length < 2) {
        res.status(400).send({errors:
          [{status: '400', title: 'A question need at least two answer'}]
        });
        //throw new Error(`A question need at least two answer`);
        resource = null;
      } else if (!resource._attrs.answers ||
        resource._attrs.answers.length === 0) {
        res.status(400).send({errors:
          [{status: '400', title: 'A question need at least one good answer'}]
        });
        //throw new Error(`A question need at one good answer`);
        resource = null;
      }
      return resource;
    }
  }
};
