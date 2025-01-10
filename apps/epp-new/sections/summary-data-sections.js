'use strict';

module.exports = {
  sectionHeader: [
    {
      step: '/enter-license-number',
      field: 'new-renew-license-number'
    }
  ],
  'your-name': {
    steps: [
      {
        step: '/your-name',
        field: 'new-renew-title'
      },
      {
        step: '/your-name',
        field: 'new-renew-first-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-middle-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-last-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-other-names'
      }
    ]
  },
  'new-renew-contact-details': {
    steps: [
      {
        step: '/contact-details',
        field: 'new-renew-phone-number'
      },
      {
        step: '/contact-details',
        field: 'new-renew-email'
      }
    ]
  },
  'medical-information': {
    steps: [
      {
        step: '/medical-declaration',
        field: 'medical-declaration',
        // TODO: can this be configured in translation?
        parse: value =>
          value ? 'I have read and agree to the medical declarations' : ''
      }
    ]
  },
    'medical-information': {
      steps: [
        {
          step: '/medical-history',
          field: 'new-renew-has-seen-doctor'
        },
        {
          step: '/medical-history',
          field: 'new-renew-received-treatment'
        }
      ]
    }
};
