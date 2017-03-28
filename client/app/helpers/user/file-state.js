import Ember from 'ember';

export function userFileState(params/*, hash*/) {
  let state = params[0];

  if (state === 'choose') {
    return 0;
  }
  else if (state === 'convert') {
    return 1;
  }
  else if (state === 'valid') {
    return 2;
  }
  return 3;
}

export default Ember.Helper.helper(userFileState);
