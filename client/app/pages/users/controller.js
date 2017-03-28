import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['email:asc'],
  users: Ember.computed.sort('model', 'sortProperties'),
  actions: {
    exportUsers() {
      const usersCsv = this.get('users').map(user => {
        let userCsv = `${user.get('email')};${user.get('password')};${user.get('role')}`;
        //if ()
        return userCsv;
      });
      console.log(usersCsv);
    },
    removeUser(user) {
      user.destroyRecord();
    }
  }
});

