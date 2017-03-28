import Ember from 'ember';

export default Ember.Controller.extend({
  state: 'choose',
  file: null,
  users: null,
  error: false,

  actions: {
    selectFile(file) {
      this.set('file', file);
      this.set('state', 'convert');
    },
    convertFile(users) {
      this.set('users', users);
      this.set('state', 'valid');
    },
    toggleModal(){
      this.toggleProperty('isShowingUsers');
    }
  }
});
