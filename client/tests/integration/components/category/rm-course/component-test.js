import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('category/rm-course', 'Integration | Component | category/rm course', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{category/rm-course}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#category/rm-course}}
      template block text
    {{/category/rm-course}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
