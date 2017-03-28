import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Result',
  userId: null,
  model(params) {
    const userId = this.get('sessionAccount').getCurrentUserId();
    this.set('userId',userId);
    let responses;
    return this.store.query('response', {filter: { simple: { _id: params.responses} } } )
      .then(r => {
        responses = r.get('firstObject').get('responses');
        return this.store.query('examination',
          { filter: { simple: {
            testid: params.test,
            user: userId
          } } });
      })
      .then(exam => {
        exam = exam.get('firstObject');
        const qs = exam.get('questions').map(questionExam => {
          return this.store.findRecord('question', questionExam.get('id'));
        });
        return Ember.RSVP.all(qs);
      })
      .then(questions=> {
        let goodAnswers = 0;
        questions.forEach((question, index) => {
          if (question.get('answers').toString() === responses[index]) {
            goodAnswers++;
          }
        });
        return {
          goodAnswers : goodAnswers,
          numberOfQuestion:  questions.length
        };
      })
      .catch(err => {
        console.log(err);
      });
  }
});
