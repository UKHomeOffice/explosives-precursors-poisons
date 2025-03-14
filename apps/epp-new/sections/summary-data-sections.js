'use strict';

const config = require('../../../config');
const {
  getFormattedDate,
  isDateOlderOrEqualTo
} = require('../../../utilities/helpers');
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
      },
      {
        step: '/other-names-summary',
        field: 'othernames',
        changeLink: '/new-renew/other-names-summary',
        parse: (list, req) => {
          if (req.sessionModel.get('new-renew-other-names') === 'no') {
            return null;
          }
          return req.sessionModel.get('othernames')?.aggregatedValues.length > 0 ?
            req.sessionModel.get('othernames').aggregatedValues.map(a => a.fields.map(field => {
              if (
                field.field === 'new-renew-other-name-start-date' ||
                field.field === 'new-renew-other-name-stop-date'
              ) {
                field.parsed = getFormattedDate(field.parsed);
              }
              return field.parsed;
            }).filter(Boolean).join('\n')).join('\n \n') : null;
        }
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
      },
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
  'current-address-details': {
    steps: [
      {
        step: '/home-address',
        field: 'new-renew-home-address-line1'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-line2'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-town'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-county'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-postcode'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-country'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-moveto-date',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/previous-addresses',
        field: 'otheraddresses',
        changeLink: '/new-renew/previous-addresses',
        parse: (list, req) => {
          const homeMoveDate = req.sessionModel.get('new-renew-home-address-moveto-date');
          if (homeMoveDate && isDateOlderOrEqualTo(homeMoveDate, 5)) {
            return null;
          }
          const addresses = req.sessionModel.get('otheraddresses')?.aggregatedValues || [];

          return addresses.length > 0 ? addresses.map(({ fields }) => fields.map(f =>
            f.field === 'new-renew-previous-home-address-moveto-date'
              ? getFormattedDate(f.parsed) : f.parsed).filter(Boolean).join('\n')).filter(Boolean).join('\n\n') : null;
        }
      },
      {
        step: '/upload-proof-address',
        field: 'new-renew-proof-address',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-proof-address') && documents?.length > 0) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      }
    ]
  },
  'criminal-record': {
    steps: [
      {
        step: '/criminal-record',
        field: 'new-renew-have-criminal-record'
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
  'proof-of-identity': {
    steps: [
      {
        step: '/identity-details',
        field: 'new-renew-applicant-Id-type'
      },
      {
        step: '/identity-details',
        field: 'new-renew-UK-passport-number'
      },
      {
        step: '/identity-details',
        field: 'new-renew-EU-passport-number'
      },
      {
        step: '/identity-details',
        field: 'new-renew-Uk-driving-licence-number'
      },
      {
        step: '/upload-british-passport',
        field: 'new-renew-british-passport',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/upload-british-passport') &&
            documents?.length > 0
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }

          return null;
        }
      },
      {
        step: '/upload-passport',
        field: 'new-renew-eu-passport',
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
        step: '/upload-certificate-conduct',
        field: 'new-renew-certificate-conduct',
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
      },
      {
        step: '/upload-driving-licence',
        field: 'new-renew-upload-driving-licence',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/upload-driving-licence') &&
            documents?.length > 0
          ) {
            return documents.map(file => file.name);
          }

          return null;
        }
      }
    ]
  },
  'other-licences': {
    steps: [
      {
        step: '/other-licences',
        field: 'new-renew-other-firearms-licence'
      },
      {
        step: '/other-licences',
        field: 'new-renew-other-shotgun-licence'
      },
      {
        step: '/other-licences',
        field: 'new-renew-other-refused-licence'
      },
      {
        step: '/licence-history',
        field: 'licenceshistory',
        changeLink: '/new-renew/licence-history',
        parse: (list, req) => {
          if (req.sessionModel.get('new-renew-other-refused-licence') === 'no') {
            return null;
          }
          return req.sessionModel.get('licenceshistory')?.aggregatedValues.length > 0 ?
            req.sessionModel.get('licenceshistory').aggregatedValues.map(a => a.fields.map(field => {
              if (field.field === 'new-renew-licence-refused-date') {
                field.parsed = getFormattedDate(field.parsed);
              }
              return field.parsed;
            }).filter(Boolean).join('\n')).join('\n \n') : null;
        }
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
      },
      {
        step: '/medical-form',
        field: 'new-renew-medical-form',
        parse: (documents, req) => {
          if (
            req.sessionModel
              .get('steps')
              .includes('/medical-form') &&
            documents?.length > 0
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      }
    ]
  },
  'countersignatory-details': {
    steps: [
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-title'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-firstname'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-middlename',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-lastname'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-years'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-howyouknow'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-occupation'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-address-1'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-address-2',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-town-or-city'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-postcode'
      },
      {
        step: '/countersignatory-contact',
        field: 'new-renew-countersignatory-phone-number'
      },
      {
        step: '/countersignatory-contact',
        field: 'new-renew-countersignatory-email'
      },
      {
        step: '/birth-certificate',
        field: 'new-renew-birth-certificate',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps').includes('/birth-certificate') &&
            documents?.length > 0 &&
            req.sessionModel.get('new-renew-dob') &&
            !isDateOlderOrEqualTo(req.sessionModel.get('new-renew-dob'), 18)
          ) {
            return documents.map(file => file?.name)?.join('\n\n');
          }
          return null;
        }
      }
    ]
  }
};
