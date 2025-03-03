const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');
const PostcodeValidation = require('../../utilities/helpers//postcode-validation');
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const AfterDateOfBirth = require('../epp-common/behaviours/after-date-validator');
const SaveDocument = require('../epp-common/behaviours/save-document');
const RemoveDocument = require('../epp-common/behaviours/remove-document');
const DobEditRedirect = require('../epp-common/behaviours/dob-edit-redirect');
const RenderPrecursorDetails = require('../epp-common/behaviours/render-precursors-detail');
const SaveHomeAddress = require('../epp-common/behaviours/save-home-address');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/amend',
  steps: {
    '/licence-number': {
      behaviours: [validateAndRedirect, RemoveEditMode, ValidateLicenceNumber],
      backLink: '/application-type',
      fields: ['amend-licence-number'],
      next: '/name-on-licence',
      locals: { captionHeading: 'Section 1 of 23' }
    },
    '/name-on-licence': {
      fields: [
        'amend-name-title',
        'amend-firstname',
        'amend-middlename',
        'amend-lastname'
      ],
      next: '/date-of-birth',
      locals: { captionHeading: 'Section 2 of 23' }
    },
    '/date-of-birth': {
      behaviours: [
        DobEditRedirect('amend-date-of-birth', '/amend/birth-certificate')
      ],
      fields: ['amend-date-of-birth'],
      next: '/home-address',
      locals: { captionHeading: 'Section 3 of 23' }
    },
    '/home-address': {
      behaviours: [
        PostcodeValidation,
        SaveHomeAddress([
          'amend-address-1',
          'amend-address-2',
          'amend-town-or-city',
          'amend-county',
          'amend-postcode',
          'amend-country'
        ])
      ],
      fields: [
        'amend-address-1',
        'amend-address-2',
        'amend-town-or-city',
        'amend-county',
        'amend-postcode',
        'amend-country'
      ],
      next: '/contact-details',
      locals: { captionHeading: 'Section 4 of 23' }
    },
    '/contact-details': {
      fields: ['amend-phone-number', 'amend-email'],
      locals: { captionHeading: 'Section 5 of 23' },
      next: '/amend-details'
    },
    '/amend-details': {
      fields: ['amend-name-options'],
      forks: [
        {
          target: '/new-name',
          condition: {
            field: 'amend-name-options',
            value: 'yes'
          }
        },
        {
          target: '/change-home-address',
          condition: {
            field: 'amend-name-options',
            value: 'no'
          }
        }
      ],
      locals: { captionHeading: 'Section 6 of 23' },
      next: '/new-name'
    },
    '/new-name': {
      fields: [
        'amend-new-name-title',
        'amend-new-firstname',
        'amend-new-middlename',
        'amend-new-lastname',
        'amend-new-date-name-changed'
      ],
      next: '/identity-details',
      locals: { captionHeading: 'Section 7 of 23' },
      behaviours: [AfterDateOfBirth]
    },
    '/identity-details': {
      fields: [
        'amend-applicant-Id-type',
        'amend-UK-passport-number',
        'amend-EU-passport-number',
        'amend-Uk-driving-licence-number'
      ],
      forks: [
        {
          target: '/upload-british-passport',
          condition: req =>
            req.sessionModel.get('amend-applicant-Id-type') === 'UK-passport'
        },
        {
          target: '/upload-passport',
          condition: req =>
            req.sessionModel.get('amend-applicant-Id-type') === 'EU-passport'
        }
      ],

      locals: { captionHeading: 'Section 8 of 23' },
      next: '/upload-driving-licence'
    },
    '/upload-british-passport': {
      behaviours: [
        SaveDocument('amend-british-passport', 'file-upload'),
        RemoveDocument('amend-british-passport')
      ],
      fields: ['file-upload'],
      continueOnEdit: true,
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 23' }
    },
    '/upload-passport': {
      behaviours: [
        SaveDocument('amend-eu-passport', 'file-upload'),
        RemoveDocument('amend-eu-passport')
      ],
      fields: ['file-upload'],
      continueOnEdit: true,
      next: '/upload-certificate-conduct',
      locals: { captionHeading: 'Section 9 of 23' }
    },
    '/upload-driving-licence': {
      behaviours: [
        SaveDocument('amend-uk-driving-licence', 'file-upload'),
        RemoveDocument('amend-uk-driving-licence')
      ],
      fields: ['file-upload'],
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 23' }
    },
    '/upload-certificate-conduct': {
      behaviours: [
        SaveDocument('amend-certificate-conduct', 'file-upload'),
        RemoveDocument('amend-certificate-conduct')
      ],
      fields: ['file-upload'],
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 23' }
    },
    '/change-home-address': {
      fields: ['amend-home-address-options'],
      forks: [
        {
          target: '/new-address',
          condition: {
            field: 'amend-home-address-options',
            value: 'yes'
          }
        },
        {
          target: '/change-substances',
          condition: {
            field: 'amend-home-address-options',
            value: 'no'
          }
        }
      ],
      locals: { captionHeading: 'Section 10 of 23' },
      next: '/new-address'
    },
    '/new-address': {
      fields: [
        'amend-new-address-1',
        'amend-new-address-2',
        'amend-new-town-or-city',
        'amend-new-county',
        'amend-new-postcode',
        'amend-new-country',
        'amend-new-date-moved-to-address'
      ],
      behaviours: [AfterDateOfBirth, PostcodeValidation],
      next: '/upload-proof-address',
      locals: { captionHeading: 'Section 11 of 23' }
    },
    '/upload-proof-address': {
      behaviours: [
        SaveDocument('amend-proof-address', 'file-upload'),
        RemoveDocument('amend-proof-address')
      ],
      fields: ['file-upload'],
      continueOnEdit: true,
      next: '/change-substances',
      locals: { captionHeading: 'Section 12 of 23' }
    },
    '/change-substances': {
      fields: ['amend-explosive-precusor-type'],
      locals: { captionHeading: 'Section 13 of 23' },
      next: '/explosives-precursors'
    },
    '/explosives-precursors': {
      fields: ['amend-regulated-explosives-precursors'],
      forks: [
        {
          target: '/select-precursor',
          continueOnEdit: true,
          condition: {
            field: 'amend-regulated-explosives-precursors',
            value: 'yes'
          }
        }
      ],
      next: '/poisons',
      locals: { captionHeading: 'Section 14 of 23' }
    },
    '/select-precursor': {
      fields: ['amend-precursor-field'],
      locals: { captionHeading: 'Section 15 of 23' },
      next: '/precursor-details'
    },
    '/precursor-details': {
      behaviours: [RenderPrecursorDetails('amend-precursor-field')],
      fields: [
        'amend-why-need-precursor',
        'amend-how-much-precursor',
        'amend-what-concentration-precursor',
        'amend-where-to-store-precursor',
        'amend-where-to-use-precursor',
        'store-precursors-other-address',
        'precursors-use-other-address'
      ],
      locals: { captionHeading: 'Section 15 of 23' },
      next: '/precursors-summary'
    },
    '/precursors-summary': {
      fields: [],
      next: '/poisons',
      locals: { captionHeading: 'Section 15 of 23' }
    },
    '/poisons': {
      fields: [],
      locals: { captionHeading: 'Section 16 of 23' },
      next: '/countersignatory-details'
    },
    '/countersignatory-details': {
      fields: [
        'amend-countersignatory-title',
        'amend-countersignatory-firstname',
        'amend-countersignatory-middlename',
        'amend-countersignatory-lastname',
        'amend-countersignatory-years',
        'amend-countersignatory-howyouknow',
        'amend-countersignatory-occupation'
      ],
      locals: { captionHeading: 'Section 18 of 23' },
      next: '/countersignatory-address'
    },
    '/countersignatory-address': {
      fields: [
        'amend-countersignatory-address-1',
        'amend-countersignatory-address-2',
        'amend-countersignatory-town-or-city',
        'amend-countersignatory-postcode'
      ],
      locals: { captionHeading: 'Section 19 of 23' },
      next: '/countersignatory-contact'
    },
    '/countersignatory-contact': {
      fields: [
        'amend-countersignatory-phone-number',
        'amend-countersignatory-email'
      ],
      locals: { captionHeading: 'Section 20 of 23' },
      next: '/section-eighteen'
    },
    '/section-eighteen': {
      fields: ['amend-countersignatory-document-type'],
      next: '/confirm'
    },
    '/birth-certificate': {
      fields: [],
      next: '/confirm'
    },
    '/confirm': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [SummaryPageBehaviour],
      next: '/declaration'
    },
    '/declaration': {
      fields: ['amend-declaration'],
      next: '/application-submitted',
      locals: { captionHeading: 'Section 23 of 23' }
    },
    '/application-submitted': {
      clearSession: true
    }
  }
};
