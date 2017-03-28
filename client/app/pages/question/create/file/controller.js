import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  units: Ember.computed.sort('model.units', 'sortProperties'),
  courses: Ember.computed.sort('model.courses', 'sortProperties'),
  chapters: Ember.computed.sort('model.chapters', 'sortProperties'),

  state: 'choose',
  file: null,
  questions: null,
  category: null,
  error: false,

  actions: {
    selectFile(file) {
      this.set('file', file);
      this.set('state', 'convert');
    },
    convertFile(questions) {
      this.set('questions', questions);
      this.set('state', 'categorize');
    },
    categorize(category) {
      this.set('category', category);
      this.set('state', 'valid');
    }
  }
});
