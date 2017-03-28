import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user/create/step-valid', 'Integration | Component | user/create/step valid', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user/create/step-valid}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user/create/step-valid}}
      template block text
    {{/user/create/step-valid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
