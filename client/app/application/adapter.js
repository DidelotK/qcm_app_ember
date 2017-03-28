import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'front/config/environment';

export default JSONAPIAdapter.extend({
  namespace: 'api',
  host: ENV.APP.API_HOST,
  authorizer: 'authorizer:oauth2'
});
