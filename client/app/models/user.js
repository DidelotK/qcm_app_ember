import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  // Attributes
  email: attr('string'),
  role: attr('string'),
  password: attr('string'),
  class: belongsTo('class'),
  givencourse: belongsTo('course'),
  // Associations
  examinations: hasMany('examination', {inverse: 'user'})
  // responses: hasMany('response', {inverse: 'users'})
});
