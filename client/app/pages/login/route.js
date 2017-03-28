import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  title: 'Login',
  model() {
    let creds = {
      email: '',
      password: ''
    };
    return creds;
  }
});
