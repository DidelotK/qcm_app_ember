import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  // Attributes
  name: attr('string'),
  description: attr('string'),
  launchedat: attr('date'),
  createdat: attr('date'),
  duration: attr('number'),
  numberofquestion: attr('number'),
  // Associations
  userstested: hasMany('user'),
  exams: hasMany('examination'),
  unit: belongsTo('unit'),
  course: belongsTo('course'),
  chapters: hasMany('chapter'),
  creatorid: belongsTo('user')
});
