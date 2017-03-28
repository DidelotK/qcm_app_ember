'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const self = process.env.SERVER_IP;

const Tests = require('./tests').model;
const Questions = require('./questions').model;

const examinationSchema = Schema({
  testid: { type: ObjectId, ref: 'Test' , required: true},
  questions: [{ type: ObjectId, ref: 'Question' }],
  user: { type: ObjectId, ref: 'User' },
  state: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'SUBMITTED'],
    default: 'PENDING'
  }
});

const model = mongoose.model('Examination', examinationSchema);

module.exports = {
  schema: examinationSchema,
  model: model,
  registry: {
    urlTemplates: {
      self: `${self}/api/examinations/{id}`,
      relationship: `${self}/api/examinations/{ownerId}/relationships/{path}`
    },
    beforeSave: (resource, req, res, superFn) => { // jshint ignore:line
      return new Promise((resolve, reject) => { // jshint ignore:line
        if (!resource._relationships.testid.linkage.value.id) {
          return reject(null);
        }
        Tests
          .findOne({_id: resource._relationships.testid.linkage.value.id},
            (err, test) => {
              if (err) {
                return reject(null);
              }
              if (test) {
                Questions.find({
                    unit: test.unit,
                    course: test.course,
                    chapter: {$in: test.chapters}
                  },
                  {id: 1}, (err, questions) => {
                    if (err) {
                      return reject(null);
                    }
                    if (!questions ||
                      questions.length < 3) {
                      res.status(400)
                        .send({
                          errors:
                            [{
                              status: '400',
                              title: 'Not enough question'
                            }]
                        });
                      return reject(null);
                    }
                    if (resource._relationships
                        .questions.linkage.value.length === 0) {
                      resource._relationships.questions.linkage.value =
                        choixQuestions(questions,3);
                    }
                    return resolve(resource);
                  });

              } else {
                reject(null);
              }
            });
      });
    }
  }
};


const choixQuestions = (questions, numberofquestions) => {
  let choix = [];
  let index = -1;
  for (let i = 0; i < numberofquestions; i++) {
    index = Math.floor(Math.random() * questions.length);
    choix.push(questions[index]);
    questions.splice(index,1);
  }
  return choix;
};
