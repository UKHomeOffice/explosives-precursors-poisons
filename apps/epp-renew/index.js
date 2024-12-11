const hof = require('hof');
const stepCounter = require('./behaviours/step-counter');
const summary = hof.components.summary;

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-renew/fields',
  views: 'apps/epp-renew/views',
  translations: 'apps/epp-renew/translations',
  baseUrl: '/',
  behaviours: [stepCounter],
  steps: {
    '/application-type': {},
    '/enter-license-number': {
      fields: ['new-renew-license-number'],
      backLink: 'application-type',
      next: '/your-name',
      locals: {
        captionHeading: 'Section 0 of 20'
      }
    },
  }
};
