import Ember from 'ember';

export default Ember.Component.extend({
  state: null,
  error: false,
  actions: {
    categorize(category) {
      this.sendAction('action', category);
    }
  }
});
