const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/amend-license',
  steps: {
    '/section-one': {
      behaviours: [validateAndRedirect],
      backLink: '/application-type',
      fields: ['amend-licence-number'],
      next: '/section-two'
    },
    '/section-two': {
      fields: [
        'amend-name-title',
        'amend-firstname',
        'amend-middlename',
        'amend-lastname'
      ],
      next: '/section-three'
    },
    '/section-three': {
      fields: ['amend-date-of-birth'],
      next: '/section-four'
    },
    '/section-four': {
      fields: [
        'amend-post-address-1',
        'amend-post-address-2',
        'amend-post-town-or-city',
        'amend-post-county',
        'amend-post-postcode',
        'amend-post-country'
      ],
      next: '/section-five'
    },
    '/section-five': {
      fields: [
        'amend-phone-number',
        'amend-email'
      ],
      next: '/section-six'
    },
    '/section-six': {
      fields: ['amend-options'],
      next: '/section-seven'
    },
    '/section-seven': {
      fields: [
        'amend-option-name-title',
        'amend-option-firstname',
        'amend-option-middlename',
        'amend-option-lastname',
        'amend-option-date-name-changed'
      ],
      next: '/section-eight'
    },
    '/section-eight': {
      fields: ['amend-document-type'],
      next: '/section-nine'
    },
    '/section-nine': {
      next: '/section-ten'
    },
    '/section-ten': {
      fields: [
        'amend-new-post-address-1',
        'amend-new-post-address-2',
        'amend-new-post-town-or-city',
        'amend-new-post-county',
        'amend-new-post-postcode',
        'amend-new-post-country',
        'amend-new-date-moved-to-address'
      ],
      next: '/section-eleven'
    },
    '/section-eleven': {
      next: '/section-twelve'
    },
    '/section-twelve': {
      fields: [
        'amend-reason-for-licence'
      ],
      next: '/section-thirteen'
    },
    '/section-thirteen': {
      fields: [
        'amend-explosive-precusor-type'
      ],
      next: '/section-fourteen'
    },
    '/section-fourteen': {
      fields: [
        'amend-poison-type'
      ],
      next: '/section-fifteen'
    },
    '/section-fifteen': {
      fields: [
        'amend-countersignatory-name-title',
        'amend-countersignatory-firstname',
        'amend-countersignatory-middlename',
        'amend-countersignatory-lastname',
        'amend-years-known-countersignatory',
        'amend-how-you-know-countersignatory',
        'amend-countersignatory-occupation'
      ],
      next: '/section-sixteen'
    },
    '/section-sixteen': {
      fields: [
        'amend-countersignatory-address-1',
        'amend-countersignatory-address-2',
        'amend-countersignatory-town-or-city',
        'amend-countersignatory-postcode'
      ],
      next: '/section-seventeen'
    },
    '/section-seventeen': {
      fields: [
        'amend-countersignatory-phone',
        'amend-countersignatory-email'
      ],
      next: '/section-eighteen'
    },
    '/section-eighteen': {
      fields: [
        'amend-countersignatory-document-type'
      ],
      next: '/confirm'
    },
    '/confirm': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [SummaryPageBehaviour],
      next: '/declaration'
    },
    '/declaration': {
      next: '/application-submitted'
    },
    '/application-submitted': {
      clearSession: true
    }
  }
};
