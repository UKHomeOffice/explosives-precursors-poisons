const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');
const PostcodeValidation = require('../../utilities/helpers//postcode-validation');
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const AfterDateOfBirth = require('../epp-common/behaviours/after-date-validator');

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
      locals: { captionHeading: 'Section 1 of 20' }
    },
    '/name-on-licence': {
      fields: [
        'amend-name-title',
        'amend-firstname',
        'amend-middlename',
        'amend-lastname'
      ],
      next: '/date-of-birth',
      locals: { captionHeading: 'Section 2 of 20' }
    },
    '/date-of-birth': {
      fields: ['amend-date-of-birth'],
      next: '/home-address',
      locals: { captionHeading: 'Section 3 of 20' }
    },
    '/home-address': {
      behaviours: [PostcodeValidation],
      fields: [
        'amend-address-1',
        'amend-address-2',
        'amend-town-or-city',
        'amend-county',
        'amend-postcode',
        'amend-country'
      ],
      next: '/contact-details',
      locals: { captionHeading: 'Section 4 of 20' }
    },
    '/contact-details': {
      fields: [
        'amend-phone-number',
        'amend-email'
      ],
      locals: {captionHeading: 'Section 5 of 20'},
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
      locals: {captionHeading: 'Section 6 of 20'},
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
      locals: { captionHeading: 'Section 7 of 20' },
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
        {target: '/upload-british-passport',
          condition: req =>
            req.sessionModel.get('amend-applicant-Id-type') === 'UK-passport'
        },
        {target: '/upload-passport',
          condition: req =>
            req.sessionModel.get('amend-applicant-Id-type') === 'EU-passport'
        }
      ],

      locals: { captionHeading: 'Section 8 of 20' },
      next: '/upload-driving-licence'
    },
    '/upload-british-passport': {
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 20' }
    },
    '/upload-passport': {
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 20' }
    },
    '/upload-driving-licence': {
      next: '/change-home-address',
      locals: { captionHeading: 'Section 9 of 20' }
    },
    '/change-home-address': {
      fields: [
        'amend-new-post-address-1',
        'amend-new-post-address-2',
        'amend-new-post-town-or-city',
        'amend-new-post-county',
        'amend-new-post-postcode',
        'amend-new-post-country',
        'amend-new-date-moved-to-address'
      ],
      next: '/section-eleven'
    },
    '/section-eleven': {
      next: '/section-twelve'
    },
    '/section-twelve': {
      fields: ['amend-reason-for-licence'],
      next: '/section-thirteen'
    },
    '/section-thirteen': {
      fields: ['amend-explosive-precusor-type'],
      next: '/section-fourteen'
    },
    '/section-fourteen': {
      fields: ['amend-poison-type'],
      next: '/section-fifteen'
    },
    '/section-fifteen': {
      fields: [
        'amend-countersignatory-name-title',
        'amend-countersignatory-firstname',
        'amend-countersignatory-middlename',
        'amend-countersignatory-lastname',
        'amend-years-known-countersignatory',
        'amend-how-you-know-countersignatory',
        'amend-countersignatory-occupation'
      ],
      next: '/section-sixteen'
    },
    '/section-sixteen': {
      fields: [
        'amend-countersignatory-address-1',
        'amend-countersignatory-address-2',
        'amend-countersignatory-town-or-city',
        'amend-countersignatory-postcode'
      ],
      next: '/section-seventeen'
    },
    '/section-seventeen': {
      fields: ['amend-countersignatory-phone', 'amend-countersignatory-email'],
      next: '/section-eighteen'
    },
    '/section-eighteen': {
      fields: ['amend-countersignatory-document-type'],
      next: '/confirm'
    },
    '/confirm': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [SummaryPageBehaviour],
      next: '/declaration'
    },
    '/declaration': {
      next: '/application-submitted'
    },
    '/application-submitted': {
      clearSession: true
    }
  }
};
