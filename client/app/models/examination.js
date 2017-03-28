import Model from 'ember-data/model';
import {belongsTo, hasMany} from 'ember-data/relationships';

export default Model.extend({
  // Associations
  testid: belongsTo('test'),
  user: belongsTo('user', {inverse: 'examinations'}),
  questions: hasMany('question')
});
