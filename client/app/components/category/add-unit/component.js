import Ember from 'ember';

export default Ember.Component.extend({
  error: null,
  unit: null,
  actions: {
    removeError() {
      this.set('error', false);
    },
    addUnit: function() {
      if (this.get('unit') && this.get('unit') !== '') {
        this.sendAction('action', this.get('unit'));
        this.set('unit', null);
        this.set('error', false);
      } else {
        this.set('error', true);
      }
    }
  }
});
