'use strict';

module.exports = {
  'Licence details': {
    steps: [
      {
        step: '/amend-licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'Applicant name': {
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
  'Applicant date of': {
    steps: [
      {
        step: '/amend-date-of-birth',
        field: 'amend-date-of-birth'
      }
    ]
  }
};
