import Ember from 'ember';
export default Ember.Route.extend({
  files: null,
  model(){

  },
  afterModel(){
    $(document).attr('title','Home'); // jshint ignore:line
  }
});
