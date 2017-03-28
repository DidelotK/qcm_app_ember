import Ember from 'ember';

export function isChapterInCourse([chapter, coursesId]/*, hash*/) {
  if (!coursesId) {return false;}
  if (typeof coursesId === 'string') {
    if (chapter.get('belongsto.id') === coursesId) {
      return true;
    }
  } else {
    for (let index in coursesId) {
      if (chapter.get('belongsto.id') === coursesId[index]) {
        return true;
      }
    }
  }
  return false;
}

export default Ember.Helper.helper(isChapterInCourse);
