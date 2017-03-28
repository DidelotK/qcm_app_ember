import Ember from 'ember';

export default Ember.Component.extend({
  state: null,
  error: false,
  actions: {
    valid() {
      this.sendAction('action');
    }
  }
});
