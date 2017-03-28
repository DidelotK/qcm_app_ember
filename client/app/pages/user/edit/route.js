import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Edit user',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin') {
          this.redirectTo('index');
        }
      });
  },
  model(params) {
    const roles = ['admin','professor','student'];
    const user = this.store.findRecord('user', params.user);
    return Ember.RSVP.hash({
      user: user,
      roles: roles
    });
  },
  actions: {
    editUser(user) {
      user.save()
        .then(() => {
          this.transitionTo('pages.users');
        })
        .catch(() => {
          this.toast.error('', 'Fail to edit user' ,{
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
    },
    cancel() {
      this.transitionTo('pages.users');
    }
  }
});
