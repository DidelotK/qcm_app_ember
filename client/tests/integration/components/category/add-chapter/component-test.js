import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('category/add-chapter', 'Integration | Component | category/add chapter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{category/add-chapter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#category/add-chapter}}
      template block text
    {{/category/add-chapter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
