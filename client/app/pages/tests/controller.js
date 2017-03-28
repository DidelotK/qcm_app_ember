import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  tests: Ember.computed.sort('model', 'sortProperties'),
  actions: {
    startTest(test) {
      test.save();
    }
  }
});
