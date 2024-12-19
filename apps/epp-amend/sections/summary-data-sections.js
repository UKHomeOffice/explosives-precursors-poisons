'use strict';
<<<<<<< HEAD
const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

=======


>>>>>>> 20c28c3 (EPP 56 Enter Licence Number Page)
module.exports = {
  'amend-licence-number': {
    steps: [
      {
<<<<<<< HEAD
        step: '/licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'applicant-name': {
    steps: [
      {
        step: '/name-on-licence',
        field: 'amend-name-title'
      },
      {
        step: '/name-on-licence',
        field: 'amend-firstname'
      },
      {
        step: '/name-on-licence',
        field: 'amend-middlename'
      },
      {
        step: '/name-on-licence',
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
        field: 'amend-date-of-birth',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
=======
        steps: '/amend-licence-number',
        field: 'amend-licence-number'
      }
    ]
>>>>>>> 20c28c3 (EPP 56 Enter Licence Number Page)
  }
};
