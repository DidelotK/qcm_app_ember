import Ember from 'ember';

export default Ember.Component.extend({
  state: null,
  error: false,
  actions: {
    selectFile(file) {
      const re = /(?:\.([^.]+))?$/;
      if (file[0] && file[0].type && re.exec(file[0].name)[1] === 'csv') {
        this.set('error', false);
        this.sendAction('action', file[0]);
      } else {
        this.set('error', true);
      }
    }
  }
});
