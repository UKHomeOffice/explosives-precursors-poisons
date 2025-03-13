const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const SaveDocument = require('../epp-common/behaviours/save-document');
const RemoveDocument = require('../epp-common/behaviours/remove-document');
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');
const UploadFileCounter = require('../epp-common/behaviours/uploaded-files-counter');
const JourneyValidator = require('../epp-common/behaviours/journey-validator');
const DobUnder18Redirect = require('../epp-common/behaviours/dob-under18-redirect');

// TODO: Use DeleteRedundantDocuments behaviour similar to amend flow to
// remove the uploaded files when dependent option changes
module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-replace/fields',
  views: 'apps/epp-replace/views',
  translations: 'apps/epp-replace/translations',
  baseUrl: '/replace',
  behaviours: [JourneyValidator],
  steps: {
    '/replace-licence': {
      behaviours: [validateAndRedirect, RemoveEditMode],
      backLink: '/application-type',
      fields: ['replace-licence'],
      forks: [
        {
          target: '/police-report',
          condition: req => req.sessionModel.get('replace-licence') === 'replace-licence-stolen',
          continueOnEdit: true
        },
        {
          target: '/licence-number',
          condition: req => req.sessionModel.get('replace-licence') !== 'replace-licence-stolen',
          continueOnEdit: true
        }
      ]
    },
    '/police-report': {
      fields: ['replace-police-report'],
      forks: [
        {
          target: '/crime-report-details',
          condition: {
            field: 'replace-police-report',
            value: 'yes'
          }
        },
        {
          target: '/must-report-theft',
          condition: {
            field: 'replace-police-report',
            value: 'no'
          }
        }
      ],
      locals: { captionHeading: 'Section 2 of 26' },
      next: '/crime-report-details'
    },
    '/must-report-theft': {
      next: '/licence-number'
    },
    '/crime-report-details': {
      fields: ['replace-report-details'],
      next: '/licence-number'
    },
    '/licence-number': {
      behaviours: [ValidateLicenceNumber],
      fields: ['replace-licence-number'],
      locals: { captionHeading: 'Section 3 of 26' },
      next: '/your-name'
    },
    '/your-name': {
      fields: [
        'replace-title',
        'replace-first-name',
        'replace-middle-name',
        'replace-last-name'
      ],
      locals: { captionHeading: 'Section 4 of 26' },
      next: '/section-five'
    },
    '/section-five': {
      fields: ['replace-date-of-birth'],
      next: '/section-six'
    },
    '/section-six': {
      fields: [
        'replace-post-address-1',
        'replace-post-address-2',
        'replace-post-town-or-city',
        'replace-post-county',
        'replace-post-postcode',
        'replace-post-country'
      ],
      next: '/section-seven'
    },
    '/section-seven': {
      fields: ['replace-phone-number', 'replace-email'],
      next: '/section-eight'
    },
    '/section-eight': {
      fields: ['replace-is-details-changed'],
      next: '/section-nine'
    },
    '/section-nine': {
      fields: ['replace-replace-type'],
      next: '/section-ten'
    },
    '/section-ten': {
      fields: [
        'replace-new-name-title',
        'replace-new-firstname',
        'replace-new-middlename',
        'replace-new-lastname',
        'replace-date-new-name-changed'
      ],
      next: '/section-eleven'
    },
    '/section-eleven': {
      fields: ['replace-which-document-type'],
      next: '/upload-british-passport'
    },
    '/upload-british-passport': {
      behaviours: [
        SaveDocument('replace-british-passport', 'file-upload'),
        RemoveDocument('replace-british-passport')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/upload-passport'
    },
    '/upload-passport': {
      behaviours: [
        SaveDocument('replace-eu-passport', 'file-upload'),
        RemoveDocument('replace-eu-passport')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/upload-certificate-conduct'
    },
    '/upload-driving-licence': {
      behaviours: [
        SaveDocument('replace-upload-driving-licence', 'file-upload'),
        RemoveDocument('replace-upload-driving-licence')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/section-thirteen'
    },
    '/upload-certificate-conduct': {
      behaviours: [
        SaveDocument('replace-certificate-conduct', 'file-upload'),
        RemoveDocument('replace-certificate-conduct')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/section-thirteen'
    },
    '/section-thirteen': {
      fields: [
        'replace-new-post-address-1',
        'replace-new-post-address-2',
        'replace-new-post-town-or-city',
        'replace-new-post-county',
        'replace-new-post-postcode',
        'replace-new-post-country',
        'replace-new-date-moved-to-address'
      ],
      next: '/section-fourteen'
    },
    '/section-fourteen': {
      next: '/upload-proof-address'
    },
    '/upload-proof-address': {
      behaviours: [
        SaveDocument('replace-proof-address', 'file-upload'),
        RemoveDocument('replace-proof-address'),
        UploadFileCounter('replace-proof-address')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 15 of 26' },
      next: '/section-sixteen'
    },
    '/section-sixteen': {
      fields: ['replace-explosive-precusor-type'],
      // fields: [
      //   'replace-countersignatory-address-1',
      //   'replace-countersignatory-address-2',
      //   'replace-countersignatory-town-or-city',
      //   'replace-countersignatory-postcode'
      // ],
      next: '/section-sixteen-type'
    },
    '/section-sixteen-type': {
      fields: ['replace-explosive-precusor-details'],
      next: '/section-sixteen-summary'
    },
    '/section-sixteen-summary': {
      next: '/section-seventeen'
    },
    '/section-seventeen': {
      fields: [],
      next: '/select-poisons'
    },
    '/select-poisons': {
      fields: ['replace-poison'],
      locals: { captionHeading: 'Section 20 of 26' },
      next: '/countersignatory-details'
    },
    '/section-seventeen-poison': {
      fields: ['replace-poison-details'],
      next: '/section-seventeen-summary'
    },
    '/section-seventeen-summary': {
      next: '/countersignatory-details'
    },
    '/countersignatory-details': {
      fields: [
        'replace-countersignatory-name-title',
        'replace-countersignatory-firstname',
        'replace-countersignatory-middlename',
        'replace-countersignatory-lastname',
        'replace-years-known-countersignatory',
        'replace-how-you-know-countersignatory',
        'replace-countersignatory-occupation'
      ],
      next: '/section-nineteen'
    },
    '/section-nineteen': {
      fields: [
        'replace-countersignatory-address-1',
        'replace-countersignatory-address-2',
        'replace-countersignatory-town-or-city',
        'replace-countersignatory-postcode'
      ],
      next: '/section-twenty'
    },
    '/section-twenty': {
      fields: [
        'replace-countersignatory-phone',
        'replace-countersignatory-email'
      ],
      next: '/section-twenty-one'
    },
    '/section-twenty-one': {
      fields: ['replace-countersignatory-document-type'],
      next: '/countersignatory-id'
    },
    '/countersignatory-id': {
      behaviours: [DobUnder18Redirect('replace-date-of-birth', '/birth-certificate')],
      fields: [
        'replace-countersignatory-Id-type',
        'replace-countersignatory-UK-passport-number',
        'replace-countersignatory-EU-passport-number',
        'replace-countersignatory-Uk-driving-licence-number'
      ],
      locals: { captionHeading: 'Section 24 of 26' },
      next: '/confirm'
    },
    '/birth-certificate': {
      behaviours: [
        SaveDocument('replace-birth-certificate', 'file-upload'),
        RemoveDocument('replace-birth-certificate')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 24 of 26' },
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
