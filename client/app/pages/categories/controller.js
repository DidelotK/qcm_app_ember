import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  units: Ember.computed.sort('model.units', 'sortProperties'),
  courses: Ember.computed.sort('model.courses', 'sortProperties'),
  chapters: Ember.computed.sort('model.chapters', 'sortProperties'),
  choiceMenu: null,
  actions: {
    setChoiceFromMenu(choice) {
      this.set('choiceMenu', choice);
    },
    /******** ADD ********/
    addUnit(unit) {
      const unitReccord = this.store.createRecord('unit', {
        name: unit
      });
      unitReccord.save()
        .catch(() => {
          unitReccord.destroyRecord();
        });
    },
    addCourse(unitId, courseName) {
      const courseReccord = this.store.createRecord('course', {
        name: courseName,
        belongsto: this.get('store').peekRecord('unit', unitId)
      });
      courseReccord.save()
        .catch(() => {
          courseReccord.destroyRecord();
        });
    },
    addChapter(courseId, chapterName) {
      const chapterReccord = this.store.createRecord('chapter', {
        name: chapterName,
        belongsto: this.get('store').peekRecord('course', courseId)
      });
      chapterReccord.save()
        .catch(() => {
          chapterReccord.destroyRecord();
        });
    },
    /******** REMOVE ********/
    removeUnit(unit) {
      //const unit = this.get('store').peekRecord('unit', unitId);
      unit.destroyRecord();
    },
    removeCourse(course) {
      //const unit = this.get('store').peekRecord('unit', unitId);
      course.destroyRecord();
    },
    removeChapter(chapter) {
      //const unit = this.get('store').peekRecord('unit', unitId);
      chapter.destroyRecord();
    }
  }
});
