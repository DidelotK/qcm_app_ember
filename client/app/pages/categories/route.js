import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Manage categories',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin' && role !== 'professor') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    return Ember.RSVP.hash({
      units: this.get('store').findAll('unit'),
      courses: this.get('store').findAll('course'),
      chapters: this.get('store').findAll('chapter')
    });
  }
});
