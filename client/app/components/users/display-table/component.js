import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addUser() {
      this.sendAction('addUser');
    },
    editUser() {
      this.sendAction('editUser');
    },
    removeUser(user) {
      this.sendAction('removeAction', user);
    }
  }
});
