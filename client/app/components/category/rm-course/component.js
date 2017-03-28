import Ember from 'ember';

export default Ember.Component.extend({
  error: false,
  units: null,
  courses: null,
  selectedUnit: null,
  selectedCourse: null,
  actions: {
    updateUE(component, id, value) { // jshint ignore:line
      this.set('selectedUnit', id);
      this.set('selectedCourse', null);
    },
    removeError() {
      this.set('error', false);
    },
    removeCourse() {
      if (this.get('selectedUnit') && this.get('selectedCourse') && this.get('selectedCourse') !== '') {
        this.set('error', false);
        this.sendAction('action', this.get('selectedCourse'));
        this.set('selectedUnit', null);
        this.set('selectedCourse', null);
      } else {
        this.set('error', true);
      }
    }
  }
});
