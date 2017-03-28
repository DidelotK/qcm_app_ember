import Ember from 'ember';

export default Ember.Component.extend({
  questions: null,
  filter: null,
  actions: {
    addQuestion() {
      this.sendAction('addQuestion');
    }
  }
});
