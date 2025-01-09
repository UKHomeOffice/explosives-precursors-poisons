'use strict';

const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

module.exports = {
  'your-name': {
    steps: [
      {
        step: '/your-name',
        field: 'new-renew-title'
      },
      {
        step: '/your-name',
        field: 'new-renew-first-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-middle-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-last-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-other-names'
      }
    ]
  },
  'applicant-details': {
    steps: [
      {
        step: '/other-nationalities',
        field: 'new-renew-other-country-nationality'
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-date-fr',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-date-to',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
  },
  'new-renew-contact-details': {
    steps: [
      {
        step: '/contact-details',
        field: 'new-renew-phone-number'
      },
      {
        step: '/contact-details',
        field: 'new-renew-email'
      }
    ]
  }
};
