'use strict';


module.exports = {
  'amend-licence-number': {
    steps: [
      {
        steps: '/amend-licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'amend-contact-details': {
    steps: [
      {
        steps: '/amend-contact-details',
        field: 'amend-phone-number'
      },
      {
        steps: '/amend-contact-details',
        field: 'amend-email'
      }
    ]
  }
};
