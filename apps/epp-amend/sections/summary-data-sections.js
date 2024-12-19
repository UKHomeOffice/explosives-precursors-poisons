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
        fields: ['amend-name-title', 'amend-firstname', 'amend-middlename', 'amend-lastname']
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
