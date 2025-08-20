'use strict';
const config = require('../../../config');
const {
  isDateOlderOrEqualTo,
  displayOptionalField,
  formatAttachments, showCounterSignatoryDetails
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
  'licence-details': {
    steps: [
      {
        step: '/licence-number',
        field: 'replace-licence-number',
        parse: (value, req) => displayOptionalField(req, '/licence-number', value)
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
        field: 'replace-middle-name',
        parse: (value, req) => displayOptionalField(req, '/your-name', value)
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
  'replace-date-of-birth': {
    steps: [
      {
        step: '/date-of-birth',
        field: 'replace-date-of-birth',
        parse: date => date && dateFormatter.format(new Date(date))
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
        field: 'replace-home-address-2',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'replace-home-town-or-city'
      },
      {
        step: '/home-address',
        field: 'replace-home-county',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'replace-home-postcode',
        parse: (value, req) => displayOptionalField(req, '/home-address', value)
      },
      {
        step: '/home-address',
        field: 'replace-home-country'
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
  'replace-is-details-changed': {
    steps: [
      {
        step: '/changed-details',
        field: 'replace-is-details-changed'
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
        parse: (value, req) => displayOptionalField(req, '/new-name', value)
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
        parse: (documents, req) => formatAttachments(documents, req, '/upload-british-passport')
      },
      {
        step: '/upload-passport',
        field: 'replace-eu-passport',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-passport')
      },
      {
        step: '/upload-driving-licence',
        field: 'replace-upload-driving-licence',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-driving-licence')
      },
      {
        step: '/upload-certificate-conduct',
        field: 'replace-certificate-conduct',
        parse: (documents, req) => formatAttachments(documents, req, '/upload-certificate-conduct')
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
  'replace-new-home-address': {
    steps: [
      {
        step: '/new-address',
        field: 'replace-new-address-1'
      },
      {
        step: '/new-address',
        field: 'replace-new-address-2',
        parse: (value, req) => displayOptionalField(req, '/new-address', value)
      },
      {
        step: '/new-address',
        field: 'replace-new-town-or-city'
      },
      {
        step: '/new-address',
        field: 'replace-new-county',
        parse: (value, req) => displayOptionalField(req, '/new-address', value)
      },
      {
        step: '/new-address',
        field: 'replace-new-postcode',
        parse: (value, req) => displayOptionalField(req, '/new-address', value)
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
        parse: (documents, req) => formatAttachments(documents, req, '/upload-proof-address')
      }
    ]
  },
  'replace-change-substances': {
    steps: [
      {
        step: '/change-substances',
        field: 'replace-change-substances',
        dependsOn: 'replace-is-details-changed'
      }
    ]
  },
  'replace-licence-for-explosives-precursors': {
    steps: [
      {
        steps: '/explosives-precursors',
        field: 'replace-regulated-explosives-precursors',
        dependsOn: 'replace-change-substances'
      }
    ]
  },
  'replace-explosives-precursor-details': {
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
  'replace-licence-for-poisons': {
    steps: [
      {
        step: '/poisons',
        field: 'replace-poisons-option',
        dependsOn: 'replace-change-substances'
      }
    ]
  },
  'replace-poison-details': {
    steps: [
      {
        step: '/poison-summary',
        field: 'poisons-details-aggregate',
        parse: (list, req) => {
          if (!list?.aggregatedValues || req.sessionModel.get('replace-change-substances') === 'no') { return null; }
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
        field: 'replace-countersignatory-title',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-firstname',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-middlename',
        parse: (value, req) =>
          showCounterSignatoryDetails(value, req) &&
          displayOptionalField(req, '/countersignatory-details', value)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-lastname',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-years',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-howyouknow',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-details',
        field: 'replace-countersignatory-occupation',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-address-1',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-address-2',
        parse: (value, req) =>
          showCounterSignatoryDetails(value, req) &&
          displayOptionalField(req, '/countersignatory-address', value)
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-town-or-city',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-address',
        field: 'replace-countersignatory-postcode',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-contact',
        field: 'replace-countersignatory-phone-number',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-contact',
        field: 'replace-countersignatory-email',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-Id-type',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-UK-passport-number',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-EU-passport-number',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/countersignatory-id',
        field: 'replace-countersignatory-Uk-driving-licence-number',
        parse: (value, req) => showCounterSignatoryDetails(value, req)
      },
      {
        step: '/birth-certificate',
        field: 'replace-birth-certificate',
        parse: (documents, req) => {
          if (
            req.sessionModel.get('steps')?.includes('/birth-certificate') &&
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
        },
        dependsOn: 'replace-is-details-changed'
      }
    ]
  }
};
