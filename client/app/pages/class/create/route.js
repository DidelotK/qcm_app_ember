import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service('session-account'),
  title: 'Create class',
  redirect() {
    this.get('sessionAccount').getRole()
      .then(role => {
        if (role !== 'admin' && role !== 'professor') {
          this.redirectTo('index');
        }
      });
  },
  model() {
    const _class = this.store.createRecord('class', {
      name: 'Yo'
    });
    return Ember.RSVP.hash({
      _class: _class,
      users: this.store.query('user', { filter: { simple: { role: 'student' } } })
    });
  },
  actions: {
    createClass(_class) {
      console.log(_class.get('students'));
      //_class.set('name', _class.get('name').toUpperCase());
      _class.save()
        .then(() => {
          //this.transitionTo('pages.classes');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  exit() {
    const _class = this.get('controller').get('model')._class;
    if (_class.get('isNew') && !_class.get('isSaving')) {
      _class.deleteRecord();
    }
  }

});
