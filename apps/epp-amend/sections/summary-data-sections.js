'use strict';

module.exports = {
  'Licence details': {
    steps: [
      {
        step: '/licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'amend-name-on-licence': {
    steps: [
      {
        step: '/amend-name-on-licence',
        fields: ['amend-name-title', 'amend-firstname', 'amend-middlename', 'amend-lastname']
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
