import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  classes: Ember.computed.sort('model', 'sortProperties'),
  actions: {
    updateRole(component, value, id) { // jshint ignore:line
      const user = this.model.user;
      user.set('role',value);
    }
  }
});
