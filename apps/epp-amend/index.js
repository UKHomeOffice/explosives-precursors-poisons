const validateAndRedirect = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/amend-license',
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
