import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('question/show-before-create', 'Integration | Component | question/show before create', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{question/show-before-create}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#question/show-before-create}}
      template block text
    {{/question/show-before-create}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
