const sectionCounter = require('./behaviours/section-counter');
const homeRedirection = require('./behaviours/home-redirection');
module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-renew/fields',
  views: 'apps/epp-renew/views',
  translations: 'apps/epp-renew/translations',
  baseUrl: '/new-and-renew',
  behaviours: [sectionCounter],
  steps: {
    '/enter-license-number': {
      behaviours: [homeRedirection],
      fields: ['new-renew-license-number'],
      backLink: '/application-type',
      next: '/your-name',
      locals: {
        captionHeading: 'Section 0 of 20'
      }
    }
  }
};
