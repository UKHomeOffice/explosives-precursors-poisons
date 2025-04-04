'use strict';
const config = require('../../../config');
const {
  isDateOlderOrEqualTo
} = require('../../../utilities/helpers');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

module.exports = {
  'replace-licence': {
    steps: [
      {
        step: '/replace-licence',
        field: 'replace-licence'
      }
    ]
  },
  'replace-contact-details': {
    steps: [
      {
        steps: '/contact-details',
        field: 'replace-phone-number'
      },
      {
        steps: '/contact-details',
        field: 'replace-email'
      }
    ]
  },
  'replace-police-report': {
    steps: [
      {
        step: '/police-report',
        field: 'replace-police-report'
      },
      {
        step: '/crime-report-details',
        field: 'replace-police-force'
      },
      {
        step: '/crime-report-details',
        field: 'replace-crime-number'
      }
    ]
  },
  'replace-is-details-changed': {
    steps: [
      {
        step: '/changed-details',
        field: 'replace-is-details-changed'
      }
    ]
  },
  'replace-home-address-options': {
    steps: [
      {
        step: '/change-home-address',
        field: 'replace-home-address-options'
      }
    ]
  },
  'replace-name-options': {
    steps: [
      {
        steps: '/amend-licence',
        field: 'replace-name-options'
      }
    ]
  },
  'replace-new-name': {
    steps: [
      {
        step: '/new-name',
        field: 'replace-new-name-title'
      },
      {
        step: '/new-name',
        field: 'replace-new-firstname'
      },
      {
        step: '/new-name',
        field: 'replace-new-middlename',
        parse: value => value || 'Not provided'
      },
      {
        step: '/new-name',
        field: 'replace-new-lastname'
      },
      {
        step: '/new-name',
        field: 'replace-date-new-name-changed',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/identity-details',
        field: 'replace-which-document-type'
      },
      {
        step: '/identity-details',
        field: 'replace-UK-passport-number'
      },
      {
        step: '/identity-details',
        field: 'replace-EU-passport-number'
      },
      {
        step: '/identity-details',
        field: 'replace-Uk-driving-licence-number'
      },
      {
        step: '/upload-british-passport',
        field: 'replace-british-passport',
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
        field: 'replace-eu-passport',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-passport') &&
            documents?.length > 0
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      },
      {
        step: '/upload-driving-licence',
        field: 'replace-upload-driving-licence',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-driving-licence') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }

          return null;
        }
      },
      {
        step: '/upload-proof-address',
        field: 'replace-proof-address',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-proof-address') &&
            documents?.length > 0
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }

          return null;
        }
      },
      {
        step: '/upload-certificate-conduct',
        field: 'replace-certificate-conduct',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-certificate-conduct') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }
          return null;
        }
      }
    ]
  },
  'replace-new-home-address': {
    steps: [
      {
        step: '/new-address',
        field: 'replace-new-address-1'
      },
      {
        step: '/new-address',
        field: 'replace-new-address-2',
        parse: value => value || 'Not provided'
      },
      {
        step: '/new-address',
        field: 'replace-new-town-or-city'
      },
      {
        step: '/new-address',
        field: 'replace-new-county',
        parse: value => value || 'Not provided'
      },
      {
        step: '/new-address',
        field: 'replace-new-postcode',
        parse: value => value || 'Not provided'
      },
      {
        step: '/new-address',
        field: 'replace-new-country'
      },
      {
        step: '/new-address',
        field: 'replace-new-date-moved-to-address',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/upload-proof-address',
        field: 'replace-proof-address',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-proof-address') &&
            documents?.length > 0
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }

          return null;
        }
      }
    ]
  },
  'replace-change-substances': {
    steps: [
      {
        step: '/change-substances',
        field: 'replace-change-substances'
      }
    ]
  },
  'applicant-name': {
    steps: [
      {
        step: '/your-name',
        field: 'replace-title'
      },
      {
        step: '/your-name',
        field: 'replace-first-name'
      },
      {
        step: '/your-name',
        field: 'replace-middle-name'
      },
      {
        step: '/your-name',
        field: 'replace-last-name'
      },
      {
        step: '/your-name',
        field: 'replace-other-names'
      }
    ]
  },
  'home-address-details': {
    steps: [
      {
        step: '/home-address',
        field: 'replace-home-address-1'
      },
      {
        step: '/home-address',
        field: 'replace-home-address-2'
      },
      {
        step: '/home-address',
        field: 'replace-home-town-or-city'
      },
      {
        step: '/home-address',
        field: 'replace-home-county'
      },
      {
        step: '/home-address',
        field: 'replace-home-postcode'
      },
      {
        step: '/home-address',
        field: 'replace-home-country'
      }
    ]
  },
  'licence-details': {
    steps: [
      {
        step: '/licence-number',
        field: 'replace-licence-number'
      }
    ]
  },
  'replace-licence-for-poisons': {
    steps: [
      {
        step: '/select-poisons',
        field: 'replace-poison'
      }
    ]
  },
  'replace-date-of-birth': {
    steps: [
      {
        step: '/date-of-birth',
        field: 'replace-date-of-birth',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
  },
  'countersignatory-details': {
    steps: [
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-title'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-firstname'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-middlename',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-lastname'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-years'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-howyouknow'
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-occupation'
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-address-1'
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-address-2',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-town-or-city'
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-postcode'
      },
      {
        step: '/countersignatory-contact',
        field: 'replace-countersignatory-phone-number'
      },
      {
        step: '/countersignatory-contact',
        field: 'replace-countersignatory-email'
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-Id-type'
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-UK-passport-number'
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-EU-passport-number'
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-Uk-driving-licence-number'
      },
      {
        step: '/birth-certificate',
        field: 'replace-birth-certificate',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/birth-certificate') &&
            documents?.length > 0 &&
            req.sessionModel.get('replace-date-of-birth') &&
            !isDateOlderOrEqualTo(
              req.sessionModel.get('replace-date-of-birth'),
              18
            )
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      }
    ]
  }
};
