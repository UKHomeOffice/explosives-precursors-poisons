'use strict';
const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

module.exports = {
  'amend-licence-number': {
    steps: [
      {
        steps: '/licence-number',
        field: 'amend-licence-number'
      }
    ]
  },
  'amend-applicant-name': {
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
  'amend-date-of-birth': {
    steps: [
      {
        step: '/date-of-birth',
        field: 'amend-date-of-birth',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
  },
  'amend-address-on-licence': {
    steps: [
      {
        step: '/home-address',
        field: 'amend-address-1'
      },
      {
        step: '/home-address',
        field: 'amend-address-2'
      },
      {
        step: '/home-address',
        field: 'amend-town-or-city'
      },
      {
        step: '/home-address',
        field: 'amend-county'
      },
      {
        step: '/home-address',
        field: 'amend-postcode'
      },
      {
        step: '/home-address',
        field: 'amend-country'
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
  'amend-name-options': {
    steps: [
      {
        steps: '/amend-details',
        field: 'amend-name-options'
      }
    ]
  },
  'amend-new-name-details': {
    steps: [
      {
        step: '/identity-details',
        field: 'amend-applicant-Id-type'
      },
      {
        step: '/identity-details',
        field: 'amend-UK-passport-number'
      },
      {
        step: '/identity-details',
        field: 'amend-EU-passport-number'
      },
      {
        step: '/identity-details',
        field: 'amend-Uk-driving-licence-number'
      },
      {
        step: '/upload-british-passport',
        field: 'file-upload',
        parse: (documentName, req) => {
          if (!req.sessionModel.get('steps').includes('/upload-british-passport')) {
            return null;
          }
          return documentName.length > 0 ? documentName.map(file => file.name) : 'No';
        }
      },
      {
        step: '/upload-passport',
        field: 'file-upload'
      },
      {
        step: '/upload-driving-licence',
        field: 'file-upload'
      }
    ]
  }
};
