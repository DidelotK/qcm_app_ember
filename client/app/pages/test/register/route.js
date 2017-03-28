import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import {task, timeout} from 'ember-concurrency';
const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Register test',
  userId: null,
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'student') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    const userId = this.get('sessionAccount').getCurrentUserId();
    this.set('userId',userId);
    return this.store.query('test',
      { filter: { simple: { userstested: this.get('userId') } } })
      .then(tests => {
        let t = [];
        tests.forEach(test => {
          const date = test.get('launchedat');
          const duration = test.get('duration');
          if (!date ||
            ( new Date(date.getTime() + duration * 60000) > Date.now())) {
            t.push(test);
          }
        });
        return t;
      })
      .catch(err => {
        console.log(err);
      });
  },
  checkTest: task(function * () {
    while (true) {
      yield timeout(2000);
      this.refresh();
    }
  }).on('activate').cancelOn('deactivate').restartable(),
  actions: {
    register(test) {
      this.get('store')
        .findRecord('user', this.get('userId'))
        .then(user => {
          const exam = this.store.createRecord('examination',{
            testid: test,
            user: user
          });
          exam.save()
            .then(() => {
              this.transitionTo('pages.test.waiting', {queryParams: {test: test.id}});
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  }
});
