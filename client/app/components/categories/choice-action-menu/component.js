import Ember from 'ember';

export default Ember.Component.extend({
  choiceAction: null,
  choiceCategory: null,
  actions: {
    changeChoiceAction(choice) {
      const previousChoice = this.get('choiceAction');
      this.set('choiceCategory', null);
      if (previousChoice === choice) {
        this.set('choiceAction', null);
      } else {
        this.set('choiceAction', choice);
      }
      this.send('sendData');
    },
    changeChoiceCategory(choice) {
      this.set('choiceCategory', choice);
      this.send('sendData');
    },
    sendData() {
      let category = {};
      category.choiceAction = this.get('choiceAction');
      category.choiceCategory = this.get('choiceCategory');
      this.sendAction('action', category);
    }
  }

});
