import Ember from 'ember';

export function questionFileState(params/*, hash*/) {
  let state = params[0];

  if (state === 'choose') {
    return 0;
  }
  else if (state === 'convert') {
    return 1;
  }
  else if (state === 'categorize') {
    return 2;
  }
  else if (state === 'valid') {
    return 3;
  }
  return 4;
}

export default Ember.Helper.helper(questionFileState);
