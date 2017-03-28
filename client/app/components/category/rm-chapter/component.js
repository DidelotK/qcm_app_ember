import Ember from 'ember';

export default Ember.Component.extend({
  error: false,
  units: null,
  courses: null,
  chapters: null,
  selectedUnit: null,
  selectedCourse: null,
  selectedChapter: null,
  actions: {
    updateUE(component, id, value) { // jshint ignore:line
      this.set('selectedUnit', id);
      this.set('selectedCourse', null);
      this.set('selectedChapter', null);
    },
    updateCourse(component, id, value) { // jshint ignore:line
      this.set('selectedCourse', id);
      this.set('selectedChapter', null);
    },
    removeError() {
      this.set('error', false);
    },
    removeChapter() {
      if (this.get('selectedUnit') && this.get('selectedCourse') &&
        this.get('selectedChapter') && this.get('selectedChapter') !== '') {
        this.set('error', false);
        this.sendAction('action', this.get('selectedChapter'));
        this.set('selectedUnit', null);
        this.set('selectedCourse', null);
        this.set('selectedChapter', null);
      } else {
        this.set('error', true);
      }
    }
  }
});
