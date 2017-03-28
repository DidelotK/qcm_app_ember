import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create test',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin' && role !== 'professor') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    return this.get('store')
      .findRecord('user', this.get('sessionAccount').getCurrentUserId())
      .then(user => {
        const test = this.store.createRecord('test',{
          duration: 10,
          numberofquestion: 20,
          creatorid: user
        });
        return Ember.RSVP.hash({
          test: test,
          units: this.get('store').findAll('unit'),
          courses: this.get('store').findAll('course'),
          chapters: this.get('store').findAll('chapter'),
          users: this.store.query('user', { filter: { simple: { role: 'student' } } })
        });
      });
  },
  actions: {
    createTest(test) {
      test.save()
        .then(() => {
          this.transitionTo('pages.tests');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  exit() {
    const test = this.get('controller').get('model').test;
    if (test.get('isNew') && !test.get('isSaving')) {
      test.deleteRecord();
    }
  }
});



