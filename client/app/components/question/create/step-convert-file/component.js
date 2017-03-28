import Ember from 'ember';
import {LatexToJSON} from '../../../../converters/latex-to-json';

export default Ember.Component.extend({
  state: null,
  error: false,
  file: null,
  questions: null,
  isShowingQuestions: false,
  actions: {
    convertFile() {
      const file = this.get('file');
      const convertisseur = new LatexToJSON();
      convertisseur.readLatexFile(file)
        .then(questionsJSON => {
          let allValid = true;
          questionsJSON.forEach(question => {
            if (!question.valid) {
              allValid = false;
            }
          });
          if (allValid) {
            this.set('error', false);
            this.set('questions', questionsJSON);
            this.sendAction('action', questionsJSON);
          }  {
            this.set('error', true);
          }
        })
        .catch(() => {
          this.set('error', true);
        });
    },
    showHideQuestion(){
      this.toggleProperty('isShowingQuestions');
    }
  }
});
