import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  actions: {
    toggle() {
        $('.ui.labeled.icon.sidebar') // jshint ignore:line
          .sidebar('toggle')
        ;
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
