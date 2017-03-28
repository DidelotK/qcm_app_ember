import Ember from 'ember';

export default Ember.Component.extend({
  units: null,
  courses: null,
  chapters: null,
  unitSelected: null,
  courseSelected: null,
  chapterSelected: null,
  actions: {
    updateUE(component, id, value) { // jshint ignore:line
      this.set('unitSelected', id);
      this.set('courseSelected', null);
      this.set('chapterSelected', null);
      this.send('sendData');
    },
    updateCourse(component, id, value) { // jshint ignore:line
      this.set('courseSelected', id);
      this.set('chapterSelected', null);
      this.send('sendData');
    },
    updateChapter(component, id, value) { // jshint ignore:line
      this.set('chapterSelected', id);
      this.send('sendData');
    },
    sendData() {
      let choice = {};
      choice.unitId = this.get('unitSelected');
      choice.courseId = this.get('courseSelected');
      choice.chapterId = this.get('chapterSelected');
      this.sendAction('action', choice);
    }
  }
});
