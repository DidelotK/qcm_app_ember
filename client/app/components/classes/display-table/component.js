import Ember from 'ember';

export default Ember.Component.extend({
  classes: null,
  actions: {
    addClass() {
      this.sendAction('addClass');
    }
  }
});
