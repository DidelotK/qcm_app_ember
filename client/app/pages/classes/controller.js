import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  classes: Ember.computed.sort('model', 'sortProperties'),
});
