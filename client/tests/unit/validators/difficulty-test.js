import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:difficulty', 'Unit | Validator | difficulty', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
