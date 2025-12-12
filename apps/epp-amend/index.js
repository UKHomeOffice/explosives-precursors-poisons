const validateAndRedirect = require('./behaviours/home-redirection');
const SummaryPageBehaviour = require('hof').components.summary;
const ValidateLicenceNumber = require('../epp-common/behaviours/licence-validator');
const PostcodeValidation = require('../../utilities/helpers/postcode-validation');
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const AfterDateOfBirth = require('../epp-common/behaviours/after-date-validator');
const SaveDocument = require('../epp-common/behaviours/save-document');
const RemoveDocument = require('../epp-common/behaviours/remove-document');
const DobEditRedirect = require('../epp-common/behaviours/dob-edit-redirect');
const RenderPrecursorDetails = require('../epp-common/behaviours/render-precursors-detail');
const SaveAddress = require('../epp-common/behaviours/save-home-other-address');
const CheckAndRedirect = require('../epp-common/behaviours/check-answer-redirect');
const UploadFileCounter = require('../epp-common/behaviours/uploaded-files-counter');
const DobUnder18Redirect = require('../epp-common/behaviours/dob-under18-redirect');
const AggregateSaveEditPrecursorPoison = require('../epp-common/behaviours/aggregator-save-update-precursors-poisons');
const EditRouteStart = require('../epp-common/behaviours/edit-route-start');
const EditRouteReturn = require('../epp-common/behaviours/edit-route-return');
const DeleteRedundantDocuments = require('../epp-common/behaviours/delete-redundant-documents');
const JourneyValidator = require('../epp-common/behaviours/journey-validator');
const RenderPoisonDetails = require('../epp-common/behaviours/render-poison-detail');
const SendNotification = require('../epp-common/behaviours/submit-notify');
const ParseSummaryPrecursorsPoisons = require('../epp-common/behaviours/parse-summary-precursors-poisons');
const ExecuteFieldCustomParse = require('../epp-common/behaviours/execute-field-custom-parse');
const ModifySummaryChangeLink = require('../epp-common/behaviours/modify-summary-change-links');
const ResetSectionSummary = require('../epp-common/behaviours/reset-section-summary');
const SetBackLink = require('../epp-common/behaviours/set-backlink');
const SaveNewName = require('../epp-common/behaviours/save-new-name');
const SaveCounterSignatoryAddress = require('../epp-common/behaviours/save-countersignatory-address');
const CounterSignatoryNavigation = require('../epp-amend/behaviours/countersignatory-navigation');
const preventDuplicateSelection = require('../epp-common/behaviours/prevent-duplicate-selection');
const { disallowIndexing } = require('../../config');

const pages = {};
if (disallowIndexing) {
  pages['/robots.txt'] = 'static/robots';
}

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/amend',
  params: '/:action?/:id?/:edit?',
  behaviours: [JourneyValidator],
  pages: pages,
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
        SaveAddress(
          [
            'amend-address-1',
            'amend-address-2',
            'amend-town-or-city',
            'amend-county',
            'amend-postcode',
            'amend-country'
          ],
          'home'
        )
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
      behaviours: [
        DeleteRedundantDocuments('amend-name-options', [
          'amend-british-passport',
          'amend-eu-passport',
          'amend-certificate-conduct',
          'amend-uk-driving-licence'
        ]),
        CheckAndRedirect('amend-name-options', [
          'amend-change-substances-options',
          'amend-name-options',
          'amend-home-address-options'
        ])
      ],
      fields: ['amend-name-options'],
      forks: [
        {
          target: '/new-name',
          condition: {
            field: 'amend-name-options',
            value: 'yes'
          }
        }
      ],
      locals: { captionHeading: 'Section 6 of 23' },
      next: '/change-home-address'
    },
    '/new-name': {
      behaviours: [
        AfterDateOfBirth('amend-date-of-birth'),
        SaveNewName([
          'amend-new-name-title',
          'amend-new-firstname',
          'amend-new-middlename',
          'amend-new-lastname',
          'amend-new-date-name-changed'
        ])
      ],
      fields: [
        'amend-new-name-title',
        'amend-new-firstname',
        'amend-new-middlename',
        'amend-new-lastname',
        'amend-new-date-name-changed'
      ],
      next: '/identity-details',
      locals: { captionHeading: 'Section 7 of 23' }
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
      behaviours: [
        DeleteRedundantDocuments('amend-home-address-options', [
          'amend-proof-address'
        ]),
        CheckAndRedirect('amend-home-address-options', [
          'amend-change-substances-options',
          'amend-name-options',
          'amend-home-address-options'
        ])
      ],
      fields: ['amend-home-address-options'],
      forks: [
        {
          target: '/new-address',
          condition: {
            field: 'amend-home-address-options',
            value: 'yes'
          }
        }
      ],
      locals: { captionHeading: 'Section 10 of 23' },
      next: '/change-substances'
    },
    '/new-address': {
      behaviours: [
        AfterDateOfBirth('amend-date-of-birth'),
        PostcodeValidation,
        SaveAddress(
          [
            'amend-new-address-1',
            'amend-new-address-2',
            'amend-new-town-or-city',
            'amend-new-county',
            'amend-new-postcode',
            'amend-new-country'
          ],
          'other'
        )
      ],
      fields: [
        'amend-new-address-1',
        'amend-new-address-2',
        'amend-new-town-or-city',
        'amend-new-county',
        'amend-new-postcode',
        'amend-new-country',
        'amend-new-date-moved-to-address'
      ],
      next: '/upload-proof-address',
      locals: { captionHeading: 'Section 11 of 23' }
    },
    '/upload-proof-address': {
      behaviours: [
        SaveDocument('amend-proof-address', 'file-upload'),
        RemoveDocument('amend-proof-address'),
        UploadFileCounter('amend-proof-address')
      ],
      fields: ['file-upload'],
      continueOnEdit: true,
      next: '/change-substances',
      locals: { captionHeading: 'Section 12 of 23' }
    },
    '/change-substances': {
      behaviours: [
        CheckAndRedirect('amend-change-substances-options', [
          'amend-change-substances-options',
          'amend-name-options',
          'amend-home-address-options'
        ]),
        ResetSectionSummary(
          ['precursors-details-aggregate', 'poisons-details-aggregate'],
          'amend-change-substances-options'
        )
      ],
      fields: ['amend-change-substances-options'],
      forks: [
        {
          target: '/explosives-precursors',
          continueOnEdit: true,
          condition: {
            field: 'amend-change-substances-options',
            value: 'yes'
          }
        }
      ],
      next: '/countersignatory-details',
      locals: { captionHeading: 'Section 13 of 23' }
    },
    '/no-details-amend': {
      behaviours: [SetBackLink],
      locals: { captionHeading: 'Section 13 of 23' }
    },
    '/explosives-precursors': {
      behaviours: [
        ResetSectionSummary(
          ['precursors-details-aggregate'],
          'amend-regulated-explosives-precursors'
        ),
        CheckAndRedirect('amend-regulated-explosives-precursors', [
          'amend-poisons-option',
          'amend-regulated-explosives-precursors'
        ])
      ],
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
      behaviours: [
        preventDuplicateSelection('precursor-field', 'precursors-details-aggregate', 'repeat-precursor')
      ],
      fields: ['precursor-field'],
      continueOnEdit: true,
      locals: { captionHeading: 'Section 15 of 23' },
      next: '/precursor-details'
    },
    '/repeat-precursor': {
      backLink: '/amend/select-precursor'
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
      locals: { captionHeading: 'Section 15 of 23' },
      next: '/precursors-summary'
    },
    '/precursors-summary': {
      behaviours: [
        AggregateSaveEditPrecursorPoison,
        ExecuteFieldCustomParse,
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
      continueOnEdit: false,
      next: '/poisons',
      locals: { captionHeading: 'Section 15 of 23' }
    },
    '/poisons': {
      behaviours: [
        ResetSectionSummary(
          ['poisons-details-aggregate'],
          'amend-poisons-option'
        ),
        CheckAndRedirect('amend-poisons-option', [
          'amend-poisons-option',
          'amend-regulated-explosives-precursors'
        ]),
        CounterSignatoryNavigation('/poisons')
      ],
      fields: ['amend-poisons-option'],
      forks: [
        {
          target: '/select-poisons',
          continueOnEdit: true,
          condition: {
            field: 'amend-poisons-option',
            value: 'yes'
          }
        }
      ],
      next: '/confirm',
      locals: { captionHeading: 'Section 16 of 23' }
    },
    '/select-poisons': {
      behaviours: [
        preventDuplicateSelection('poison-field', 'poisons-details-aggregate', 'repeat-poison')
      ],
      fields: ['poison-field'],
      next: '/poison-details',
      continueOnEdit: true,
      locals: { captionHeading: 'Section 17 of 23' }
    },
    '/repeat-poison': {
      backLink: '/amend/select-poisons'
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
      continueOnEdit: true,
      next: '/poison-summary',
      locals: { captionHeading: 'Section 17 of 23' }
    },
    '/poison-summary': {
      behaviours: [
        AggregateSaveEditPrecursorPoison,
        ExecuteFieldCustomParse,
        ParseSummaryPrecursorsPoisons,
        EditRouteReturn,
        CounterSignatoryNavigation('/poison-summary')
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
      continueOnEdit: false,
      next: '/confirm',
      locals: { captionHeading: 'Section 17 of 23' }
    },
    '/no-poisons-or-precursors': {
      behaviours: [SetBackLink, CounterSignatoryNavigation('/no-poisons-or-precursors')],
      fields: ['amend-no-poisons-precursors-options'],
      forks: [
        {
          target: '/change-substances',
          continueOnEdit: true,
          condition: {
            field: 'amend-no-poisons-precursors-options',
            value: 'no'
          }
        }
      ],
      next: '/confirm'
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
      behaviours: [
        SaveCounterSignatoryAddress([
          'amend-countersignatory-address-1',
          'amend-countersignatory-address-2',
          'amend-countersignatory-town-or-city',
          'amend-countersignatory-postcode'
        ])
      ],
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
      next: '/countersignatory-id'
    },
    '/countersignatory-id': {
      behaviours: [
        DobUnder18Redirect('amend-date-of-birth', '/birth-certificate')
      ],
      fields: [
        'amend-countersignatory-Id-type',
        'amend-countersignatory-UK-passport-number',
        'amend-countersignatory-EU-passport-number',
        'amend-countersignatory-Uk-driving-licence-number'
      ],
      locals: { captionHeading: 'Section 21 of 23' },
      next: '/confirm'
    },
    '/birth-certificate': {
      behaviours: [
        SaveDocument('amend-birth-certificate', 'file-upload'),
        RemoveDocument('amend-birth-certificate')
      ],
      fields: ['file-upload'],
      locals: { captionHeading: 'Section 21 of 23' },
      next: '/confirm'
    },
    '/confirm': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [
        SummaryPageBehaviour,
        EditRouteStart,
        ModifySummaryChangeLink
      ],
      locals: { captionHeading: 'Section 22 of 23' },
      next: '/declaration'
    },
    '/declaration': {
      behaviours: [SummaryPageBehaviour, SendNotification],
      sections: require('./sections/summary-data-sections'),
      fields: ['amend-declaration'],
      next: '/amendment-submitted',
      locals: { captionHeading: 'Section 23 of 23' }
    },
    '/amendment-submitted': {
      clearSession: true,
      backLink: false
    },
    '/exit': {}
  }
};
