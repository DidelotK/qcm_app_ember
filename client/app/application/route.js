import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionAccount: service('session-account'),
  sessionAuthenticated: function() {
    console.log('sessionAuthenticated: authentications ok');
  },
  model(){
    return this.get('sessionAccount').getRole();
  }
});
