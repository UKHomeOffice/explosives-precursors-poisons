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
  'replace-police-report': {
    steps: [
      {
        step: '/police-report',
        field: 'replace-police-report'
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
  'replace-new-name': {
    steps: [
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
