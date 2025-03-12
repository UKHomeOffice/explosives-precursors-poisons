'use strict';
const {
  isDateOlderOrEqualTo
} = require('../../../utilities/helpers');
module.exports = {
  'replace-licence': {
    steps: [
      {
        step: '/replace-licence',
        field: 'replace-licence'
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
        step: '/birth-certificate',
        field: 'replace-birth-certificate',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/birth-certificate') &&
            documents?.length > 0 && req.sessionModel.get('replace-date-of-birth')
            && !isDateOlderOrEqualTo(req.sessionModel.get('replace-date-of-birth'), 18)
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      }
    ]
  }
};
