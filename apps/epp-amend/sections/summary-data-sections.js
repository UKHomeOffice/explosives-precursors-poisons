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
  'applicant-name': {
    steps: [
      {
        step: '/amend-name-on-licence',
        field: 'amend-name-title'
      },
      {
        step: '/amend-name-on-licence',
        field: 'amend-firstname'
      },
      {
        step: '/amend-name-on-licence',
        field: 'amend-middlename'
      },
      {
        step: '/amend-name-on-licence',
        field: 'amend-lastname'
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
