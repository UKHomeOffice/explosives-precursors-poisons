'use strict';

module.exports = {
  'amend-licence-number': {
    steps: [
      {
        step: '/licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'amend-contact-details': {
    steps: [
      {
        steps: '/contact-details',
        field: 'amend-phone-number'
      },
      {
        steps: '/contact-details',
        field: 'amend-email'
      }
    ]
  },
  'amend-date-of-birth': {
    steps: [
      {
        step: '/date-of-birth',
        field: 'amend-date-of-birth'
      }
    ]
  }
};
