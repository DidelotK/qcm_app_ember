import Ember from 'ember';
import {CsvToUser} from '../../../../converters/csv-to-user';

export default Ember.Component.extend({
  state: null,
  error: false,
  file: null,
  users: null,
  isShowingUsers: false,
  actions: {
    convertFile() {
      const file = this.get('file');
      const convertisseur = new CsvToUser();
      convertisseur.readCsvFile(file)
        .then(usersJSON => {
          let allValid = true;
          usersJSON.forEach(question => {
            if (!question.valid) {
              allValid = false;
            }
          });
          if (allValid) {
            this.set('error', false);
            this.set('users', usersJSON);
            this.sendAction('action', usersJSON);
          }  {
            this.set('error', true);
          }
        })
        .catch(() => {
          this.set('error', true);
        });
    },
    showHideUsers(){
      this.toggleProperty('isShowingUsers');
    }
  }
});
