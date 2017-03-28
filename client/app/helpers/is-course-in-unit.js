import Ember from 'ember';

export function isCourseInUnit([course, unitsId]/*, hash*/) {
  if (!unitsId) {return false;}
  if (typeof unitsId === 'string') {
    if (course.get('belongsto.id') === unitsId) {
      return true;
    }
  } else {
    for (let index in unitsId) {
      if (course.get('belongsto.id') === unitsId[index]) {
        return true;
      }
    }
  }
  return false;
}

export default Ember.Helper.helper(isCourseInUnit);
