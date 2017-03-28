import Ember from 'ember';

export function makeSum(params/*, hash*/) {
  const a = params[0],
        b = params[1];
  return a + b;
}

export default Ember.Helper.helper(makeSum);
