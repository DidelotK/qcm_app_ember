import Ember from 'ember';

export default Ember.Controller.extend({
  sortPropertiesCategories: ['name:asc'],
  sortPropertiesQuestions: ['name:asc'],
  units: Ember.computed.sort('model.units', 'sortPropertiesCategories'),
  courses: Ember.computed.sort('model.courses', 'sortPropertiesCategories'),
  chapters: Ember.computed.sort('model.chapters', 'sortPropertiesCategories'),
  questions: Ember.computed.sort('model.questions', 'sortPropertiesQuestions'),
  filter: null,
  actions: {
    changeFilter(filter) {
      this.set('filter', filter);
    }
  }
});
