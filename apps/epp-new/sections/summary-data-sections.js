'use strict';

const {
  getFormattedDate,
  isDateOlderOrEqualTo,
  displayOptionalField,
  formatAttachments,
  TEXT_NOT_PROVIDED
} = require('../../../utilities/helpers');

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
        field: 'new-renew-middle-name',
        parse: (value, req) => displayOptionalField(req, '/your-name', value)
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
        parse: date => date && getFormattedDate(date)
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
        parse: (date, req) => {
          if(req.sessionModel?.get('steps')?.includes('/other-nationalities')) {
            return date ? getFormattedDate(date) : TEXT_NOT_PROVIDED;
          }
          return null;
        }
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-date-to',
        parse: (date, req) => {
          if(req.sessionModel?.get('steps')?.includes('/other-nationalities')) {
            return date ? getFormattedDate(date) : TEXT_NOT_PROVIDED;
          }
          return null;
        }
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
        field: 'new-renew-home-address-line2',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-town'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-county',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-postcode',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-country'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-moveto-date',
        parse: date => date && getFormattedDate(date)
      },
      {
        step: '/upload-proof-address',
        field: 'new-renew-proof-address',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-proof-address')
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
        parse: (documents, req) => formatAttachments(documents, req, '/upload-british-passport')
      },
      {
        step: '/upload-passport',
        field: 'new-renew-eu-passport',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-passport')
      },
      {
        step: '/upload-certificate-conduct',
        field: 'new-renew-certificate-conduct',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-certificate-conduct')
      },
      {
        step: '/upload-driving-licence',
        field: 'new-renew-upload-driving-licence',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-driving-licence')
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
  'criminal-record': {
    steps: [
      {
        step: '/criminal-record',
        field: 'new-renew-have-criminal-record'
      },
      {
        step: '/criminal-record-summary',
        field: 'criminalrecordsummary',
        changeLink: '/new-renew/criminal-record-summary',
        parse: (list, req) => {
          if (req.sessionModel.get('new-renew-have-criminal-record') === 'no') {
            return null;
          }
          return req.sessionModel.get('criminalrecordsummary')?.aggregatedValues.length > 0 ?
            req.sessionModel.get('criminalrecordsummary').aggregatedValues.map(a => a.fields.map(field => {
              if (field.field === 'new-renew-offence-date') {
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
        parse: (value, req) =>
          value ? req.translate('journey.medical-declarations-text') : ''
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
        parse: (documents, req) => formatAttachments(documents, req, '/medical-form')
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-name'
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-address-line-1'
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-address-line-2',
        parse: (value, req) => displayOptionalField(req, '/doctor-details', value)
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-town-city'
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-county',
        parse: (value, req) => displayOptionalField(req, '/doctor-details', value)
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-postcode',
        parse: (value, req) => displayOptionalField(req, '/doctor-details', value)
      },
      {
        step: '/doctor-details',
        field: 'new-renew-doctor-country'
      }
    ]
  },
  'licence-for-explosives-precursors': {
    steps: [
      {
        step: '/explosives-precursors',
        field: 'new-renew-regulated-explosives-precursors-options'
      }
    ]
  },
  'explosives-precursor-details': {
    steps: [
      {
        step: '/precursors-summary',
        field: 'precursors-details-aggregate',
        parse: list => {
          if (!list?.aggregatedValues) {
            return null;
          }
          for (const item of list.aggregatedValues) {
            item.fields.map(element => {
              if (element.field === 'display-precursor-title') {
                element.parsed = item.longTitle;
              } else {
                element.field;
                element.omitChangeLink = true;
              }
            });
          }
          return list;
        }
      }
    ]
  },
  'licence-for-poisons': {
    steps: [
      {
        step: '/poisons',
        field: 'new-renew-poisons-options'
      }
    ]
  },
  'new-renew-poison-details': {
    steps: [
      {
        step: '/poison-summary',
        field: 'poisons-details-aggregate',
        parse: list => {
          if (!list?.aggregatedValues) { return null; }
          for(const item of list.aggregatedValues) {
            item.fields.map(element => {
              if(element.field === 'display-poison-title') {
                element.parsed = item.joinTitle;
              }else{
                element.field;
                element.omitChangeLink = true;
              }
            });
          }
          return list;
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
        parse: (value, req) => displayOptionalField(req, '/countersignatory-details', value)
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
        parse: (value, req) => displayOptionalField(req, '/countersignatory-address', value)
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
        step: '/countersignatory-id',
        field: 'new-renew-countersignatory-Id-type'
      },
      {
        step: '/countersignatory-id',
        field: 'new-renew-countersignatory-UK-passport-number'
      },
      {
        step: '/countersignatory-id',
        field: 'new-renew-countersignatory-EU-passport-number'
      },
      {
        step: '/countersignatory-id',
        field: 'new-renew-countersignatory-Uk-driving-licence-number'
      },
      {
        step: '/birth-certificate',
        field: 'new-renew-birth-certificate',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps')?.includes('/birth-certificate') &&
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
