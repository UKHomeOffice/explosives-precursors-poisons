'use strict';

module.exports = {
  'amend-licence-number': {
    steps: [
      {
        step: '/amend-licence-number',
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
 
  'amend-date-of-birth': {
    steps: [
      {
        step: '/amend-date-of-birth',
        field: 'amend-date-of-birth'
      }
    ]
  }
};
