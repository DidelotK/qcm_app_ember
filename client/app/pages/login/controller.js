import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  errorMessage: null,
  actions: {
    login() {
      const creds = this.model;
      this.get('session')
        .authenticate('authenticator:oauth2', creds.email, creds.password)
        .then(() => {
          window.location.reload(true);
        })
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        });
    }
  }
});
