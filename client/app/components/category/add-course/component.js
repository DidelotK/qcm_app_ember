import Ember from 'ember';

export default Ember.Component.extend({
  error: false,
  units: null,
  selectedUnit: null,
  course: null,
  actions: {
    removeError() {
      this.set('error', false);
    },
    addCourse() {
      if (this.get('selectedUnit') && this.get('course') && this.get('course') !== '') {
        this.set('error', false);
        this.sendAction('action', this.get('selectedUnit'), this.get('course'));
        this.set('selectedUnit', null);
        this.set('course', null);
      } else {
        this.set('error', true);
      }
    }
  }
});
