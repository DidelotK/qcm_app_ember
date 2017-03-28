import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {task, timeout} from 'ember-concurrency';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Waiting for test launch',
  intervalCheck: null,
  checkStatusTest: task(function * () {
    let loop = true;
    while (loop) {
      yield timeout(1000);
      this.store.findRecord('test', this.controller.test)
        .then(test => {
          if (test.get('launchedat')) {
            this.transitionTo('pages.examination-page', {queryParams: {test: test.id}});
          }
        })
        .catch(err => {
          loop = false;
          console.log(err);
        });
    }
  }).on('activate').cancelOn('deactivate').restartable(),
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'student') {
          this.redirectTo('index');
        }
      });
  },
});
