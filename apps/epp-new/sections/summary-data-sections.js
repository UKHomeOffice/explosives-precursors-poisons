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
        step: '/licence-number',
        field: 'new-renew-licence-number'
      },
      {
        step: '/your-details',
        field: 'new-renew-dob',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/your-details',
        field: 'new-renew-birth-place'
      },
      {
        step: '/your-details',
        field: 'new-renew-birth-country'
      },
      {
        step: '/your-details',
        field: 'new-renew-country-nationality'
      },
      {
        step: '/your-details',
        field: 'new-renew-more-nationalities'
      },
      {
        step: '/your-details',
        field: 'new-renew-your-sex'
      },
      {
        step: '/your-details',
        field: 'new-renew-your-height'
      },
      {
        step: '/your-details',
        field: 'new-renew-occupation'
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
  },
  'medical-information': {
    steps: [
      {
        step: '/medical-declaration',
        field: 'medical-declaration',
        // TODO: can this be configured in translation?
        parse: value =>
          value ? 'I have read and agree to the medical declarations' : ''
      },
      {
        step: '/medical-history',
        field: 'new-renew-has-seen-doctor'
      },
      {
        step: '/medical-history',
        field: 'new-renew-received-treatment'
      }
    ]
  }
};
