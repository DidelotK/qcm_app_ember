import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pages', function() {
    this.route('login');
    this.route('examination-page');
    this.route('result');

    this.route('user', function() {
      this.route('create', function() {
        this.route('form');
        this.route('csv');
      });
      this.route('edit');
    });
    this.route('users');

    this.route('test', function() {
      this.route('create');
      this.route('register');
      this.route('waiting');
    });
    this.route('tests');

    this.route('question', function() {
      this.route('create', function() {
        this.route('form');
        this.route('file');
      });
    });
    this.route('categories');
    this.route('classes');
    this.route('questions');

    this.route('class', function() {
      this.route('create');
    });
  });
});

export default Router;
