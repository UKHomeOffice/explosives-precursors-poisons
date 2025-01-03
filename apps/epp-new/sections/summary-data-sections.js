'use strict';

module.exports = {
  'applicant-details': {
    steps: [
      {
        step: '/licence-number',
        field: 'new-renew-licence-number'
      }
    ]
  },
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
