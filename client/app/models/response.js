import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  // Attributes
  responses: attr('array'),
  // Associations
  user: belongsTo('user'),
  examination: belongsTo('examination')
});
