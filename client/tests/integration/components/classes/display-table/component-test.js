import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('classes/display-table', 'Integration | Component | classes/display table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{classes/display-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#classes/display-table}}
      template block text
    {{/classes/display-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
