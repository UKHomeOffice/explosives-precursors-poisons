
const validateAndRedirect = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-renew/fields',
  views: 'apps/epp-renew/views',
  translations: 'apps/epp-renew/translations',
  baseUrl: '/new-and-renew',
  steps: {
    '/enter-license-number': {
      behaviours: [validateAndRedirect],
      fields: ['new-renew-license-number'],
      backLink: '/application-type',
      next: '/your-name',
      locals: {
        captionHeading: 'Section 1 of 21'
      }
    }
  }
};
