/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'front',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: {
        Date: false,
      },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'connect-src': '\'self\' http://localhost:3000'
    },
    APP: {
      API_HOST: 'http://localhost:3000'
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      authenticationRoute: 'pages.login'
    }
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentSecurityPolicy['connect-src'] =
      '\'self\' http://ec2-52-59-228-229.eu-central-1.compute.amazonaws.com';
    ENV.APP.API_HOST = 'http://ec2-52-59-228-229.eu-central-1.compute.amazonaws.com';
  }

  return ENV;
};
