import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addTest() {
      this.sendAction('addTest');
    },
    startTest(test) {
      this.sendAction('startTest', test);
    },
    seeResult(test) {
      this.sendAction('seeResult', test);
    }
  }
});
