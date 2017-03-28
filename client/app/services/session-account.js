import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  getCurrentUserId() {
    return this.get('session.data.authenticated.account_id');
  },
  getRole() {
    return new Ember.RSVP.Promise(resolve => {
      if (!this.get('session.data.authenticated.account_id')) {
        return resolve(null);
      } else {
        return this.get('store')
          .findRecord('user', this.get('session.data.authenticated.account_id'))
          .then(user => {
            return resolve(user.get('role'));
          })
          .catch(() => {
            this.get('session').invalidate();
            return resolve(null);
          });
      }
    });
  }
});
