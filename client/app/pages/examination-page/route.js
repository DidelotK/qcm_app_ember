import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Examination, Good luck',
  toast: Ember.inject.service(),
  sessionAccount: service('session-account'),
  examId: null,
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'student') {
          this.redirectTo('index');
        }
      });
  },
  model(params){
    this.set('examId', params.test);
    const userId = this.get('sessionAccount').getCurrentUserId();
    const exam = this.store.query('examination',
      { filter: { simple: {
        testid: params.test,
        user: userId
      } } })
      .then(exam => {
        exam = exam.get('firstObject');
        exam.set('state','PROCESSING');
        return exam.save();
      })
      .then(exam => {
        this.set('exam', exam);
        const responses = Array(exam.get('questions').get('length'));
        const questions = exam.get('questions').map(questionExam => {
          return this.store.findRecord('question', questionExam.get('id'));
        });
        return {
          questions: questions,
          responses: responses
        };
      })
      .catch(() => {
        this.transitionTo('index');
      });
    return Ember.RSVP.hash({
      exam: exam,
      test:  this.store.findRecord('test', params.test)
    });
  },
  actions: {
    submit(responses) {
      for (let i = 0; i < responses.length; i++) {
        if (responses[i] === undefined){
          const toast = this.get('toast');
          const options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
          };
          toast.warning('All questions not answered', 'Error', options);
          return;
        }
      }
      this.get('store')
        .findRecord('user', this.get('sessionAccount').getCurrentUserId())
        .then(user => {
          const res = this.store.createRecord('response', {
            responses: responses,
            user: user,
            examination: this.get('exam')
          });
          res.save()
            .then(responses => {
              this.transitionTo('pages.result',{queryParams:
              {
                test: this.get('examId'),
                responses: responses.get('id')
              }});
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  }
});
