import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('categories/choice-action-menu', 'Integration | Component | categories/choice action menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{categories/choice-action-menu}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#categories/choice-action-menu}}
      template block text
    {{/categories/choice-action-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
