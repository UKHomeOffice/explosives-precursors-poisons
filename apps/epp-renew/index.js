const stepCounter = require('./behaviours/step-counter');
const homeRedirection = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-renew/fields',
  views: 'apps/epp-renew/views',
  translations: 'apps/epp-renew/translations',
  baseUrl: '/',
  behaviours: [stepCounter, homeRedirection],
  steps: {
    '/new-and-renew/enter-license-number': {
      fields: ['new-renew-license-number'],
      backLink: 'application-type',
      next: '/new-and-renew/your-name',
      locals: {
        captionHeading: 'Section 0 of 20'
      }
    }
  }
};
