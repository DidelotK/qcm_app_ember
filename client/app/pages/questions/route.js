import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Questions',
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
      chapters: this.get('store').findAll('chapter'),
      questions: this.get('store').findAll('question')
    });
  },
  actions: {
    addQuestion() {
      this.transitionTo('pages.question.create.form');
    }
  }
});
