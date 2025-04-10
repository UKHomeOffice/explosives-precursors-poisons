const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const SaveDocument = require('../epp-common/behaviours/save-document');
const RemoveDocument = require('../epp-common/behaviours/remove-document');
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');
const UploadFileCounter = require('../epp-common/behaviours/uploaded-files-counter');
const JourneyValidator = require('../epp-common/behaviours/journey-validator');
const DobUnder18Redirect = require('../epp-common/behaviours/dob-under18-redirect');
const PostcodeValidation = require('../../utilities/helpers/postcode-validation');
const SaveAddress = require('../epp-common/behaviours/save-home-other-address');
const InitiatePaymentRequest = require('../epp-common/behaviours/initiate-payment-request');
const GetPaymentInfo = require('../epp-common/behaviours/get-payment-info');
const AfterDateOfBirth = require('../epp-common/behaviours/after-date-validator');
const NavigateNoChanges = require('./behaviours/navigate-no-changes');
const ModifySummaryChangeLink = require('../epp-common/behaviours/modify-summary-change-links');
const RenderPoisonDetails = require('../epp-common/behaviours/render-poison-detail');
const AggregateSaveEditPrecursorPoison = require('../epp-common/behaviours/aggregator-save-update-precursors-poisons');
const ParseSummaryPrecursorsPoisons = require('../epp-common/behaviours/parse-summary-precursors-poisons');
const EditRouteStart = require('../epp-common/behaviours/edit-route-start');
const EditRouteReturn = require('../epp-common/behaviours/edit-route-return');
const CounterSignatoryNavigation = require('../epp-common/behaviours/counter-signatory-navigation');
const ResetSectionSummary = require('../epp-common/behaviours/reset-section-summary');
const RenderPrecursorDetails = require('../epp-common/behaviours/render-precursors-detail');
const SaveNewName = require('../epp-common/behaviours/save-new-name');
const SaveCounterSignatoryAddress = require('../epp-common/behaviours/save-countersignatory-address');

// TODO: Use DeleteRedundantDocuments behaviour similar to amend flow to
// remove the uploaded files when dependent option changes
module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-replace/fields',
  views: 'apps/epp-replace/views',
  translations: 'apps/epp-replace/translations',
  baseUrl: '/replace',
  params: '/:action?/:id?/:edit?',
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
      ],
      locals: { captionHeading: 'Section 1 of 26' }
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
      fields: ['replace-police-force', 'replace-crime-number'],
      locals: { captionHeading: 'Section 2 of 26' },
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
      next: '/date-of-birth'
    },
    '/date-of-birth': {
      fields: ['replace-date-of-birth'],
      next: '/home-address',
      locals: {captionHeading: 'Section 5 of 20'}
    },
    '/home-address': {
      behaviours: [
        PostcodeValidation,
        SaveAddress([
          'replace-home-address-1',
          'replace-home-address-2',
          'replace-home-town-or-city',
          'replace-home-county',
          'replace-home-postcode',
          'replace-home-country'
        ], 'home')
      ],
      fields: [
        'replace-home-address-1',
        'replace-home-address-2',
        'replace-home-town-or-city',
        'replace-home-county',
        'replace-home-postcode',
        'replace-home-country'
      ],
      locals: { captionHeading: 'Section 6 of 26' },
      next: '/contact-details'
    },
    '/contact-details': {
      fields: ['replace-phone-number', 'replace-email'],
      locals: {captionHeading: 'Section 7 of 26'},
      next: '/changed-details'
    },
    '/changed-details': {
      behaviour: [NavigateNoChanges],
      fields: ['replace-is-details-changed'],
      forks: [
        {
          target: '/amend-licence',
          condition: {
            field: 'replace-is-details-changed',
            value: 'yes'
          }
        },
        {
          target: '/confirm',
          condition: {
            field: 'replace-is-details-changed',
            value: 'no'
          }
        }
      ],
      locals: { captionHeading: 'Section 8 of 26' },
      next: '/amend-licence'
    },
    '/amend-licence': {
      fields: ['replace-name-options'],
      forks: [
        {
          target: '/new-name',
          condition: {
            field: 'replace-name-options',
            value: 'yes'
          }
        },
        {
          target: '/change-home-address',
          condition: {
            field: 'replace-name-options',
            value: 'no'
          }
        }
      ],
      locals: {captionHeading: 'Section 9 of 26'},
      next: '/new-name'
    },
    '/new-name': {
      fields: [
        'replace-new-name-title',
        'replace-new-firstname',
        'replace-new-middlename',
        'replace-new-lastname',
        'replace-date-new-name-changed'
      ],
      locals: { captionHeading: 'Section 10 of 26' },
      behaviours: [AfterDateOfBirth('replace-date-of-birth'), SaveNewName([
        'replace-new-name-title',
        'replace-new-firstname',
        'replace-new-middlename',
        'replace-new-lastname',
        'replace-date-new-name-changed'
      ])],
      next: '/identity-details'
    },
    '/identity-details': {
      fields: ['replace-which-document-type',
        'replace-UK-passport-number',
        'replace-EU-passport-number',
        'replace-Uk-driving-licence-number'
      ],
      locals: { captionHeading: 'Section 11 of 26' },
      next: '/upload-british-passport',
      forks: [
        {
          target: '/upload-british-passport',
          condition: req => req.sessionModel.get('replace-which-document-type') === 'UK-passport',
          continueOnEdit: true
        },
        {
          target: '/upload-passport',
          condition: req => req.sessionModel.get('replace-which-document-type') === 'EU-passport',
          continueOnEdit: true
        },
        {
          target: '/upload-driving-licence',
          condition: req => req.sessionModel.get('replace-which-document-type') === 'Uk-driving-licence',
          continueOnEdit: true
        }
      ]
    },
    '/upload-british-passport': {
      behaviours: [
        SaveDocument('replace-british-passport', 'file-upload'),
        RemoveDocument('replace-british-passport')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/change-home-address'
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
      next: '/change-home-address'
    },
    '/upload-certificate-conduct': {
      behaviours: [
        SaveDocument('replace-certificate-conduct', 'file-upload'),
        RemoveDocument('replace-certificate-conduct')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 12 of 26' },
      next: '/change-home-address'
    },
    '/change-home-address': {
      behaviour: [NavigateNoChanges],
      fields: ['replace-home-address-options'],
      forks: [
        {
          target: '/new-address',
          condition: {
            field: 'replace-home-address-options',
            value: 'yes'
          }
        },
        {
          target: '/change-substances',
          condition: {
            field: 'replace-home-address-options',
            value: 'no'
          }
        }
      ],
      locals: { captionHeading: 'Section 13 of 26' },
      next: '/new-address'
    },
    '/new-address': {
      fields: [
        'replace-new-address-1',
        'replace-new-address-2',
        'replace-new-town-or-city',
        'replace-new-county',
        'replace-new-postcode',
        'replace-new-country',
        'replace-new-date-moved-to-address'
      ],
      behaviours: [
        AfterDateOfBirth('replace-date-of-birth'),
        PostcodeValidation,
        SaveAddress(
          [
            'replace-new-address-1',
            'replace-new-address-2',
            'replace-new-town-or-city',
            'replace-new-county',
            'replace-new-postcode',
            'replace-new-country'
          ],
          'other'
        )
      ],
      locals: { captionHeading: 'Section 14 of 26' },
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
      next: '/change-substances'
    },
    '/change-substances': {
      behaviour: [
        NavigateNoChanges,
        ResetSectionSummary(
          ['poisons-details-aggregate'],
          'replace-change-substances'
        )
      ],
      fields: ['replace-change-substances'],
      locals: { captionHeading: 'Section 16 of 26' },
      forks: [
        {
          target: '/explosives-precursors',
          condition: {
            field: 'replace-change-substances',
            value: 'yes'
          }
        },
        {
          target: '/countersignatory-details',
          condition: {
            field: 'replace-change-substances',
            value: 'no'
          }
        }
      ]
    },
    '/explosives-precursors': {
      next: '/select-precursor'
    },
    '/select-precursor': {
      fields: ['precursor-field'],
      continueOnEdit: true,
      locals: { captionHeading: 'Section 18 of 26' },
      next: '/precursor-details'
    },
    '/precursor-details': {
      behaviours: [RenderPrecursorDetails('precursor-field')],
      fields: [
        'why-need-precursor',
        'how-much-precursor',
        'what-concentration-precursor',
        'where-to-store-precursor',
        'where-to-use-precursor',
        'store-precursors-other-address',
        'precursors-use-other-address'
      ],
      continueOnEdit: true,
      locals: { captionHeading: 'Section 18 of 26' },
      next: '/precursors-summary'
    },
    '/precursors-summary': {
      behaviours: [
        AggregateSaveEditPrecursorPoison,
        ParseSummaryPrecursorsPoisons,
        EditRouteReturn
      ],
      aggregateTo: 'precursors-details-aggregate',
      aggregateFrom: [
        'display-precursor-title',
        'why-need-precursor',
        'how-much-precursor',
        'what-concentration-precursor',
        'where-to-store-precursor',
        'where-to-use-precursor'
      ],
      titleField: ['precursor-field'],
      addStep: 'select-precursor',
      addAnotherLinkText: 'explosives precursors',
      next: '/poisons',
      locals: { captionHeading: 'Section 18 of 26' }
    },
    '/poisons': {
      next: '/select-poisons'
    },
    '/select-poisons': {
      fields: ['poison-field'],
      next: '/poison-details',
      locals: { captionHeading: 'Section 20 of 26' }
    },
    '/poison-details': {
      behaviours: [RenderPoisonDetails('poison-field')],
      fields: [
        'why-need-poison',
        'how-much-poison',
        'compound-or-salt',
        'what-concentration-poison',
        'where-to-store-poison',
        'where-to-use-poison',
        'store-poison-other-address',
        'poison-use-other-address'
      ],
      next: '/poison-summary',
      locals: { captionHeading: 'Section 20 of 26' }
    },
    '/poison-summary': {
      behaviours: [
        CounterSignatoryNavigation('/poison-summary'),
        AggregateSaveEditPrecursorPoison,
        ParseSummaryPrecursorsPoisons,
        EditRouteReturn
      ],
      aggregateTo: 'poisons-details-aggregate',
      aggregateFrom: [
        'display-poison-title',
        'why-need-poison',
        'how-much-poison',
        'compound-or-salt',
        'what-concentration-poison',
        'where-to-store-poison',
        'where-to-use-poison'
      ],
      titleField: ['poison-field'],
      addStep: 'select-poisons',
      addAnotherLinkText: 'poison',
      next: '/confirm',
      locals: { captionHeading: 'Section 20 of 26' }
    },
    '/countersignatory-details': {
      fields: [
        'replace-countersignatory-title',
        'replace-countersignatory-firstname',
        'replace-countersignatory-middlename',
        'replace-countersignatory-lastname',
        'replace-countersignatory-years',
        'replace-countersignatory-howyouknow',
        'replace-countersignatory-occupation'
      ],
      locals: { captionHeading: 'Section 21 of 26' },
      next: '/countersignatory-address'
    },
    '/countersignatory-address': {
      behaviours: [
        SaveCounterSignatoryAddress([
          'replace-countersignatory-address-1',
          'replace-countersignatory-address-2',
          'replace-countersignatory-town-or-city',
          'replace-countersignatory-postcode'
        ])
      ],
      fields: [
        'replace-countersignatory-address-1',
        'replace-countersignatory-address-2',
        'replace-countersignatory-town-or-city',
        'replace-countersignatory-postcode'
      ],
      locals: { captionHeading: 'Section 22 of 26' },
      next: '/countersignatory-contact'
    },
    '/countersignatory-contact': {
      fields: [
        'replace-countersignatory-phone-number',
        'replace-countersignatory-email'
      ],
      locals: { captionHeading: 'Section 23 of 26' },
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
      behaviours: [SummaryPageBehaviour, EditRouteStart, ModifySummaryChangeLink],
      locals: { captionHeading: 'Section 25 of 26' },
      next: '/declaration'
    },
    '/declaration': {
      behaviours: [InitiatePaymentRequest],
      fields: ['amend-declaration'],
      locals: { captionHeading: 'Section 26 of 26' }
    },
    '/payment-problem': {
      behaviours: [InitiatePaymentRequest]
    },
    '/payment-failed': {
      behaviours: [InitiatePaymentRequest]
    },
    '/payment-cancelled': {},
    '/replace-application-submitted': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [SummaryPageBehaviour, GetPaymentInfo],
      backLink: false
    },
    '/exit': {}
  }
};
