import Ember from 'ember';

export function date(params/*, hash*/) {
  let date = params[0],
    duration = params[1];
  if (date === undefined || date === null) {
    return 0;
  }
  else if (new Date(date.getTime() + duration * 60000).getTime() > Date.now()) {
    return 1;
  }
  return 2;
}

export default Ember.Helper.helper(date);
