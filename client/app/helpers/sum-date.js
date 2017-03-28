import Ember from 'ember';

export function sumDate(params/*, hash*/) {
  const date = params[0];
  const timeToAdd = params[1];
  return new Date(date.getTime() + timeToAdd * 60000);
}

export default Ember.Helper.helper(sumDate);
