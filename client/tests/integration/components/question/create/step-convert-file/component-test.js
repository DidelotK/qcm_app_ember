import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('question/create/step-convert-file', 'Integration | Component | question/create/step convert file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{question/create/step-convert-file}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#question/create/step-convert-file}}
      template block text
    {{/question/create/step-convert-file}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
