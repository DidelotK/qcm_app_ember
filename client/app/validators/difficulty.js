import BaseValidator from 'ember-cp-validations/validators/base';

const Difficulty = BaseValidator.extend({
  validate(value, options/*, model, attribute*/) {
    if ( Number(value) &&  Number(value) >= options.min &&
      Number(value) <= options.max){
      return true;
    }
    return false;
  }
});

Difficulty.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default Difficulty;
