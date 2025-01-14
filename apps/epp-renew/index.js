
const validateAndRedirect = require('./behaviours/home-redirection');
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-renew/fields',
  views: 'apps/epp-renew/views',
  translations: 'apps/epp-renew/translations',
  baseUrl: '/new-and-renew',
  steps: {
    '/licence-number': {
      behaviours: [validateAndRedirect, ValidateLicenceNumber],
      fields: ['new-renew-licence-number'],
      backLink: '/application-type',
      next: '/your-name',
      locals: {
        captionHeading: 'Section 1 of 21'
      }
    }
  }
};
