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
        step: '/new-name',
        field: 'amend-new-name-title'
      },
      {
        step: '/new-name',
        field: 'amend-new-firstname'
      },
      {
        step: '/new-name',
        field: 'amend-new-middlename'
      },
      {
        step: '/new-name',
        field: 'amend-new-lastname'
      },
      {
        step: '/new-name',
        field: 'amend-new-date-name-changed',
        parse: date => date && dateFormatter.format(new Date(date))
      },
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
        field: 'amend-british-passport',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-british-passport') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }

          return null;
        }
      },
      {
        step: '/upload-passport',
        field: 'amend-eu-passport',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-passport') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }

          return null;
        }
      },
      {
        step: '/upload-driving-licence',
        field: 'amend-uk-driving-licence',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-driving-licence') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }

          return null;
        }
      }
    ]
  },
  'amend-home-address-options': {
    steps: [
      {
        step: '/change-home-address',
        field: 'amend-home-address-options'
      }
    ]
  },
  'amend-new-home-address': {
    steps: [
      {
        step: '/new-address',
        field: 'amend-new-address-1'
      },
      {
        step: '/new-address',
        field: 'amend-new-address-2'
      },
      {
        step: '/new-address',
        field: 'amend-new-town-or-city'
      },
      {
        step: '/new-address',
        field: 'amend-new-county'
      },
      {
        step: '/new-address',
        field: 'amend-new-postcode'
      },
      {
        step: '/new-address',
        field: 'amend-new-country'
      },
      {
        step: '/new-address',
        field: 'amend-new-date-moved-to-address',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
  },
  'amend-explosives-precursor': {
    steps: [
      {
        steps: '/select-precursor',
        field: 'amend-precursor-field'
      }
    ]
  },
  'countersignatory-details': {
    steps: [
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-title'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-firstname'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-middlename',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-lastname'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-years'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-howyouknow'
      },
      {
        step: '/countersignatory-details',
        field: 'amend-countersignatory-occupation'
      },
      {
        step: '/countersignatory-address',
        field: 'amend-countersignatory-address-1'
      },
      {
        step: '/countersignatory-address',
        field: 'amend-countersignatory-address-2',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-address',
        field: 'amend-countersignatory-town-or-city'
      },
      {
        step: '/countersignatory-address',
        field: 'amend-countersignatory-postcode'
      },
      {
        step: '/countersignatory-contact',
        field: 'amend-countersignatory-phone-number'
      },
      {
        step: '/countersignatory-contact',
        field: 'amend-countersignatory-email'
      }
    ]
  }
};
