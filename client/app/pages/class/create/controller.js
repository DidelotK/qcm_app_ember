import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['email:asc'],
  users: Ember.computed.sort('model.users', 'sortProperties'),
  studentsSelected: null,
  actions: {
    updateStudents(component, ids, value) { // jshint ignore:line
      let _class = this.get('model._class');
      this.set('studentsSelected', ids);
      const idsListRelationship = ids.map(id => {
        return this.get('store').peekRecord('user', id);
      });
      _class.get('students').pushObjects(idsListRelationship);
    }
  }
});
