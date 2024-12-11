const validateAndRedirect = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-replace/fields',
  views: 'apps/epp-replace/views',
  translations: 'apps/epp-replace/translations',
  baseUrl: '/replace-license',
  steps: {
    '/start': {
      behaviours: [validateAndRedirect],
      backLink: '/application-type',
      next: '/second-route'
    },
    '/second-route': {
      backLink: 'start',
      next: '/third-route'
    },
    '/third-route': {
      backLink: 'second-route'
    }
  }
};
