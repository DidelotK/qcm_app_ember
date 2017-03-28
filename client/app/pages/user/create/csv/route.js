import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create user from csv',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin') {
          this.redirectTo('index');
        }
      });
  },
  resetController: function(controller, isExiting, transition) { // jshint ignore:line
    if (isExiting) {
      controller.set('state', 'choose');
      controller.set('file', null);
      controller.set('error', false);
      controller.set('users', null);
      controller.set('isShowingUsers', false);
    }
  },
  actions: {
    valid() {
      let promiseAllUsers = Ember.A();
      const usersJson = this.controllerFor('pages.user.create.csv').get('users');
      usersJson.forEach(user => {
        const userRecord = this.store.createRecord('user', {
          email: user.email,
          password: user.password,
          role: user.role
        });
        promiseAllUsers.pushObject(userRecord);
      });
      Ember.RSVP.all(promiseAllUsers.invoke('save'))
        .then(() => {
          this.controllerFor('pages.user.create.csv').set('state', 'finish');
          this.controllerFor('pages.user.create.csv').set('error', false);
          this.transitionTo('pages.users');
        })
        .catch(() => {
          this.controllerFor('pages.user.create.csv').set('error', true);
          promiseAllUsers.invoke('destroyRecord');
        });
    }
  }
});
