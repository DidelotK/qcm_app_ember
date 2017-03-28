import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create question',
  allAnswers: null,
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin' && role !== 'professor') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    let question = this.store.createRecord('question',{
      difficulty: 1
    });
    let answers = Ember.A([{answer: '', correct: false}]);
    answers.pushObject({answer: '', correct: false});
    this.set('allAnswers', answers);
    return Ember.RSVP.hash({
      question: question,
      allAnswers: answers,
      ues: this.get('store').findAll('unit'),
      courses: this.get('store').findAll('course'),
      chapters: this.get('store').findAll('chapter')
    });
  },
  actions: {
    createQuestion(question) {
      const controller = this.controllerFor("pages.question.create.form");
      const unitId = controller.get('selectedUnit');
      const courseId = controller.get('selectedCourse');
      const chapterId= controller.get('selectedChapter');

      let answers = [];
      let all = [];
      this.get('allAnswers').forEach(ans => {
        if (ans.correct) {
          answers.push(ans.answer);
        }
        all.push(ans.answer);
      });
      question.set('unit', this.get('store').peekRecord('unit', unitId));
      question.set('course', this.get('store').peekRecord('course', courseId));
      question.set('chapter', this.get('store').peekRecord('chapter', chapterId));
      question.set('answers', answers);
      question.set('all', all);
      question.save()
        .then(() => {
          this.transitionTo('pages.questions');
        })
        .catch(() => {
          this.toast.error('Fail to created question');
        });
    }
  },
  exit() {
    const question = this.get('controller').get('model').question;
    if (question.get('isNew') && !question.get('isSaving')) {
      question.deleteRecord();
    }
  }
});
