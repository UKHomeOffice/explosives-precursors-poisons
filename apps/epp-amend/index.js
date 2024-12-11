const homeRedirection = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/',
  behaviours: [homeRedirection],
  steps: {
    '/amend-license/start': {
      backLink: 'application-type'
    }
  }
};
