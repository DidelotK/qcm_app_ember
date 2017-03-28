import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  units: Ember.computed.sort('model.units', 'sortProperties'),
  courses: Ember.computed.sort('model.courses', 'sortProperties'),
  chapters: Ember.computed.sort('model.chapters', 'sortProperties'),
  selectedUnit: null,
  selectedCourse: null,
  selectedChapter: null,
  actions: {
    updateUE(component, id, value) { // jshint ignore:line
      let test = this.model.test;
      this.set('selectedUnit', id);
      this.set('selectedCourse', null);
      this.set('selectedChapter', null);
      test.set('unit', this.get('store').peekRecord('unit', id));
    },
    updateCourse(component, id, value) { // jshint ignore:line
      let test = this.model.test;
      this.set('selectedCourse', id);
      this.set('selectedChapter', null);
      test.set('course', this.get('store').peekRecord('course', id));
    },
    updateChapters(component, ids, value) { // jshint ignore:line
      let test = this.model.test;
      this.set('selectedChapter', ids);
      let idsListRelationship = [];
      ids.forEach(id => {
        idsListRelationship.push(this.get('store').peekRecord('chapter', id));
      });
      test.set('chapters', idsListRelationship);
    },
    updateUsers(component, ids, value) { // jshint ignore:line
      let test = this.model.test;
      let idsListRelationship = [];
      ids.forEach(id => {
        idsListRelationship.push(this.get('store').peekRecord('user', id));
      });
      test.set('userstested', idsListRelationship);
    }
  }
});
