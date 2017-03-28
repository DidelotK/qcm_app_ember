import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  // Attributes
  question: attr('string'),
  answers: attr('array'),
  all: attr('array'),
  difficulty: attr('number'),
  // Associations
  unit: belongsTo('unit'),
  course: belongsTo('course'),
  chapter: belongsTo('chapter')

});
