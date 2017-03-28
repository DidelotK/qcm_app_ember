'use strict';

let app = require('express')();
let API = require('json-api');
let mongoose = require('mongoose');
let auth = require('./authentication');

mongoose.connect(process.env.MONGO);


if (process.env.ENV === 'dev') {
  let allowHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept',
    'Cache-Control', 'Authorization'];

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods',
      'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
  app.use(require('morgan')('dev'));
}

const models = {
  User: require('../model/common/users').model,
  Question: require('../model/common/questions').model,
  Examination: require('../model/common/examinations').model,
  Response: require('../model/common/responses').model,
  Unit: require('../model/common/units').model,
  Course: require('../model/common/courses').model,
  Chapter: require('../model/common/chapters').model,
  Test: require('../model/common/tests').model,
  Class: require('../model/common/classes').model
};

const registryTemplates = {
  users: require('../model/common/users').registry,
  questions: require('../model/common/questions').registry,
  examinations: require('../model/common/examinations').registry,
  responses: require('../model/common/responses').registry,
  units: require('../model/common/units').registry,
  courses: require('../model/common/courses').registry,
  chapters: require('../model/common/chapters').registry,
  tests: require('../model/common/tests').registry,
  classes: require('../model/common/classes').registry

};

const opts = [
  'users',
  'questions',
  'examinations',
  'responses',
  'units',
  'courses',
  'chapters',
  'tests',
  'classes'
].join('|');

let adapter = new API.dbAdapters.Mongoose(models);
let registry = new API.ResourceTypeRegistry(registryTemplates,
  {dbAdapter: adapter});

let docs = new API.controllers.Documentation(registry,
  {name: 'QCM API'});
let controller = new API.controllers.API(registry);
let front = new API.httpStrategies.Express(controller, docs);

let apiReqHandler = front.apiRequest.bind(front);

app.options('/api/*', (req, res) => {
  res.send();
});

app.use('/api/users/', require('./service/user')(auth));


app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${opts})`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);

app.route(`/api/:type(${opts})/:id`)
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.route(`/api/:type(${opts})/:id/relationships/:relationship`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
  .delete(apiReqHandler);

app.use((req, res, next) => {
  front.sendError(new API.types.Error(404, undefined, 'Not Found'), req, res);
  next();
});

module.exports = app;
