import Ember from 'ember';

export default Ember.Component.extend({
  error: null,
  units: null,
  selectedUnit: null,
  actions: {
    removeError() {
      this.set('error', false);
    },
    removeUnit: function() {
      if (this.get('selectedUnit') && this.get('selectedUnit') !== '') {
        this.sendAction('action', this.get('selectedUnit'));
        this.set('selectedUnit', null);
        this.set('error', false);
      } else {
        this.set('error', true);
      }
    }
  }
});
