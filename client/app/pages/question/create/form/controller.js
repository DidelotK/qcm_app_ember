import Ember from 'ember';

export default Ember.Controller.extend({
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
    updateChapter(component, id, value) { // jshint ignore:line
      this.set('selectedChapter', id);
    },
    addAnswers(answers) {
      answers.pushObject({answer: '', correct: false});
    },
    removeAnswers(answers, index) {
      if (answers.length > 2) {
        answers.removeAt(index);
      }
    }
  }
});
