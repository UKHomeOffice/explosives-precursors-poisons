'use strict';

module.exports = {
  sectionHeader: [
    {
      step: '/enter-license-number',
      field: 'new-renew-license-number'
    }
  ],
  'new-renew-contact-details': {
    steps: [
      {
        steps: '/contact-details',
        field: 'new-renew-phone-number'
      },
      {
        steps: '/contact-details',
        field: 'new-renew-email'
      }
    ]
  }
};
