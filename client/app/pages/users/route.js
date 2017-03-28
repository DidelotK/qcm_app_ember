import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Users',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin') {
          this.redirectTo('index');
        }
      });
  },
  model() {
      return this.get('store').findAll('user', { reload: false });
  },
  actions: {
    addUser() {
      this.transitionTo('pages.user.create.form');
    },
    editUser(user) {
      this.transitionTo('pages.user.edit', {queryParams: {user: user.id}});
    }
  }
});
