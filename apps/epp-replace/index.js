const homeRedirection = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-replace/fields',
  views: 'apps/epp-replace/views',
  translations: 'apps/epp-replace/translations',
  baseUrl: '/replace-license',
  steps: {
    '/start': {
      behaviours: [homeRedirection],
      backLink: '/application-type'
    }
  }
};
