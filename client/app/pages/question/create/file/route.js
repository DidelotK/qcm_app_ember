import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create question with file',
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
  },
  resetController: function(controller, isExiting, transition) { // jshint ignore:line
    if (isExiting) {
      controller.set('state', 'choose');
      controller.set('file', null);
      controller.set('error', false);
      controller.set('questions', null);
      controller.set('isShowingQuestions', false);
    }
  },
  actions: {
    valid() {
      let promiseAllUsers = Ember.A();
      const questionsJson = this.controllerFor('pages.question.create.file').get('questions');
      const category = this.controllerFor('pages.question.create.file').get('category');
      const unit = this.get('store').peekRecord('unit', category.unit);
      const course = this.get('store').peekRecord('course', category.course);
      const chapter = this.get('store').peekRecord('chapter', category.chapter);
      questionsJson.forEach(question => {
        const questionRecord = this.store.createRecord('question', {
          question: question.question,
          all: question.all,
          answers: question.answers,
          difficulty: question.difficulty,
          unit: unit,
          course: course,
          chapter: chapter
        });
        promiseAllUsers.pushObject(questionRecord);
      });
      Ember.RSVP.all(promiseAllUsers.invoke('save'))
        .then(() => {
          this.controllerFor('pages.question.create.file').set('state', 'finish');
          this.transitionTo('pages.questions');
        })
        .catch(() => {
          this.controllerFor('pages.question.create.file').set('error', true);
          promiseAllUsers.invoke('destroyRecord');
        });
    }
  }
});
