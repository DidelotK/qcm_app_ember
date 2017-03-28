import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {task, timeout} from 'ember-concurrency';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Test management',
  checkTest: task(function * () {
    while (true) {
      yield timeout(2000);
      this.refresh();
    }
  }).on('activate').cancelOn('deactivate').restartable(),
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin' && role !== 'professor') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    // const findAll = this.get('store').findAll('category');
    return this.get('store').findAll('test');
  },
  actions: {
    addTest() {
      this.transitionTo('pages.test.create');
    },
    seeResult(test) {
      this.transitionTo('pages.result', {queryParams: {test: test.id}});
    }
  }
});
