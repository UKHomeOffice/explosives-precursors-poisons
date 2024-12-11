const homeRedirection = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-replace/fields',
  views: 'apps/epp-replace/views',
  translations: 'apps/epp-replace/translations',
  baseUrl: '/',
  behaviours: [homeRedirection],
  steps: {
    '/replace-license/start': {
      backLink: 'application-type'
    }
  }
};
