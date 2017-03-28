import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create user',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    const roles = ['admin','professor','student'];
    const user = this.store.createRecord('user', {
      role: 'student'
    });
    return Ember.RSVP.hash({
      user: user,
      roles: roles,
      classes: this.get('store').findAll('class')
    });
  },
  actions: {
    createAccount(user) {
      user.save()
        .then(() => {
          this.transitionTo('pages.users');
        })
        .catch(() => {
          this.toast.error('', 'Fail to create user' ,{
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });
        });
    }
  },
  exit() {
    const user = this.get('controller').get('model').user;
    if (user.get('isNew') && !user.get('isSaving')) {
      user.deleteRecord();
    }
  }
});
