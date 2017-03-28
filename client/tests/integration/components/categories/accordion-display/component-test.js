import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('categories/accordion-display', 'Integration | Component | categories/accordion display', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{categories/accordion-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#categories/accordion-display}}
      template block text
    {{/categories/accordion-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
