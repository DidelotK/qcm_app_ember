import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['test'],
  test: null,
  changeResponse(index, response){
    this.model.exam.responses[index] = response;
  }
});
