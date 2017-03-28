import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('category/select-chapter', 'Integration | Component | category/select chapter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{category/select-chapter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#category/select-chapter}}
      template block text
    {{/category/select-chapter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
