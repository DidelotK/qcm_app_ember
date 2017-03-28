import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['user'],
  user: null,
  actions: {
    updateRole(component, value, id) { // jshint ignore:line
      const user = this.model.user;
      user.set('role',value);
    }
  }
});
