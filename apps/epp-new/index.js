const hof = require('hof');
const sectionCounter = require('./behaviours/section-counter');
const checkBackLink = require('./behaviours/check-back-link');
const validateAndRedirect = require('./behaviours/home-redirection');
const filterCountries = require('./behaviours/filter-countries');
const SummaryPageBehaviour = hof.components.summary;
const ConfirmationDisplay = require('./behaviours/confirmation-type');
const RemoveEditMode = require('../epp-common/behaviours/remove-edit-mode');
const PostcodeValidation = require('../../utilities/helpers/postcode-validation');
const { isDateOlderOrEqualTo } = require('../../utilities/helpers');
const AggregateSaveUpdate = require('../epp-common/behaviours/aggregator-save-update');
const ParseSummaryFields = require('../epp-common/behaviours/parse-summary-fields');
const ResetSectionSummary = require('../epp-common/behaviours/reset-section-summary');
const EditRouteStart = require('../epp-common/behaviours/edit-route-start');
const EditRouteReturn = require('../epp-common/behaviours/edit-route-return');
const SaveDocument = require('../epp-common/behaviours/save-document');
const RemoveDocument = require('../epp-common/behaviours/remove-document');
const DobEditRedirect = require('../epp-common/behaviours/dob-edit-redirect');
const DobUnder18Redirect = require('../epp-common/behaviours/dob-under18-redirect');
const UploadFileCounter = require('../epp-common/behaviours/uploaded-files-counter');
const DeleteRedundantDocuments = require('../epp-common/behaviours/delete-redundant-documents');
const InitiatePaymentRequest = require('../epp-common/behaviours/initiate-payment-request');
const GetPaymentInfo = require('../epp-common/behaviours/get-payment-info');
const JourneyValidator = require('../epp-common/behaviours/journey-validator');
const AfterDateOfBirth = require('../epp-common/behaviours/after-date-validator');
const SaveAddress = require('../epp-common/behaviours/save-home-other-address');
const SaveCounterSignatoryAddress = require('../epp-common/behaviours/save-countersignatory-address');
const NoPrecursorOrPoison = require('../epp-common/behaviours/no-precursor-poison-navigate');
const NoPrecursorPoisonBackLink = require('./behaviours/no-poison-precursor-back-link');
const RenderPoisonDetails = require('../epp-common/behaviours/render-poison-detail');
const RenderPrecursorDetails = require('../epp-common/behaviours/render-precursors-detail');
const AggregateSaveEditPrecursorPoison = require('../epp-common/behaviours/aggregator-save-update-precursors-poisons');
const ParseSummaryPrecursorsPoisons = require('../epp-common/behaviours/parse-summary-precursors-poisons');
const ModifySummaryChangeLink = require('../epp-common/behaviours/modify-summary-change-links');
const { disallowIndexing } = require('../../config');

const pages = {};
if (disallowIndexing) {
  pages['/robots.txt'] = 'static/robots';
}

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new/fields',
  views: 'apps/epp-new/views',
  translations: 'apps/epp-new/translations',
  baseUrl: '/new-renew',
  params: '/:action?/:id?/:edit?',
  behaviours: [sectionCounter, JourneyValidator],
  pages: pages,
  steps: {
    '/your-name': {
      behaviours: [
        checkBackLink,
        RemoveEditMode,
        validateAndRedirect,
        ResetSectionSummary(['othernames'], 'new-renew-other-names')
      ],
      fields: [
        'new-renew-title',
        'new-renew-first-name',
        'new-renew-middle-name',
        'new-renew-last-name',
        'new-renew-other-names'
      ],
      forks: [
        {
          target: '/other-names',
          continueOnEdit: true,
          condition: req =>
            req.sessionModel.get('new-renew-other-names') === 'yes'
        }
      ],
      next: '/your-details',
      backLink: '/application-type',
      locals: {
        sectionNo: {
          new: 1,
          renew: 2
        }
      }
    },
    '/other-names': {
      fields: [
        'new-renew-other-name-title',
        'new-renew-other-name-first-name',
        'new-renew-other-name-middle-name',
        'new-renew-other-name-last-name',
        'new-renew-other-name-start-date',
        'new-renew-other-name-stop-date'
      ],
      next: '/other-names-summary',
      locals: {
        sectionNo: {
          new: 1,
          renew: 2
        }
      }
    },
    '/other-names-summary': {
      behaviours: [AggregateSaveUpdate, ParseSummaryFields, EditRouteReturn],
      aggregateTo: 'othernames',
      aggregateFrom: [
        'new-renew-other-name-title',
        'new-renew-other-name-first-name',
        'new-renew-other-name-middle-name',
        'new-renew-other-name-last-name',
        'new-renew-other-name-start-date',
        'new-renew-other-name-stop-date'
      ],
      titleField: [
        'new-renew-other-name-first-name',
        'new-renew-other-name-last-name'
      ],
      addStep: 'other-names',
      addAnotherLinkText: 'previous name',
      continueOnEdit: false,
      next: '/your-details',
      locals: {
        fullWidthPage: true,
        sectionNo: {
          new: 1,
          renew: 2
        }
      }
    },
    '/your-details': {
      behaviours: [
        DobEditRedirect('new-renew-dob', '/new-renew/birth-certificate')
      ],
      fields: [
        'new-renew-dob',
        'new-renew-birth-place',
        'new-renew-birth-country',
        'new-renew-country-nationality',
        'new-renew-more-nationalities',
        'new-renew-your-sex',
        'new-renew-your-height',
        'new-renew-occupation'
      ],
      forks: [
        {
          target: '/other-nationalities',
          condition: {
            continueOnEdit: true,
            field: 'new-renew-more-nationalities',
            value: 'yes'
          }
        }
      ],
      next: '/home-address',
      locals: {
        sectionNo: {
          new: 2,
          renew: 3
        }
      }
    },
    '/other-nationalities': {
      behaviours: [filterCountries],
      fields: [
        'new-renew-other-country-nationality',
        'new-renew-date-fr',
        'new-renew-date-to'
      ],
      next: '/home-address',
      locals: {
        sectionNo: {
          new: 2,
          renew: 3
        }
      }
    },
    '/home-address': {
      behaviours: [
        PostcodeValidation,
        SaveAddress([
          'new-renew-home-address-line1',
          'new-renew-home-address-line2',
          'new-renew-home-address-town',
          'new-renew-home-address-county',
          'new-renew-home-address-postcode',
          'new-renew-home-address-country'
        ], 'home')
      ],
      fields: [
        'new-renew-home-address-line1',
        'new-renew-home-address-line2',
        'new-renew-home-address-town',
        'new-renew-home-address-county',
        'new-renew-home-address-postcode',
        'new-renew-home-address-country',
        'new-renew-home-address-moveto-date'
      ],
      forks: [
        {
          target: '/upload-proof-address',

          condition: req => {
            const moveToDate =
              req.form.values['new-renew-home-address-moveto-date'];
            const redirect = moveToDate && isDateOlderOrEqualTo(moveToDate, 5);
            if (redirect) {
              if (
                req.sessionModel.get('otheraddresses')?.aggregatedValues
                  ?.length > 0
              ) {
                req.sessionModel.unset('otheraddresses');
              }
            }
            return redirect;
          }
        }
      ],
      next: '/previous-address',
      locals: {
        sectionNo: {
          new: 3,
          renew: 4
        }
      }
    },
    '/previous-address': {
      behaviours: [PostcodeValidation],
      fields: [
        'new-renew-previous-home-address-line1',
        'new-renew-previous-home-address-line2',
        'new-renew-previous-home-address-town',
        'new-renew-previous-home-address-county',
        'new-renew-previous-home-address-postcode',
        'new-renew-previous-home-address-country',
        'new-renew-previous-home-address-moveto-date'
      ],
      next: '/previous-addresses',
      locals: {
        sectionNo: {
          new: 3,
          renew: 4
        }
      }
    },
    '/previous-addresses': {
      behaviours: [AggregateSaveUpdate, ParseSummaryFields, EditRouteReturn],
      aggregateTo: 'otheraddresses',
      aggregateFrom: [
        'new-renew-previous-home-address-line1',
        'new-renew-previous-home-address-line2',
        'new-renew-previous-home-address-town',
        'new-renew-previous-home-address-county',
        'new-renew-previous-home-address-postcode',
        'new-renew-previous-home-address-country',
        'new-renew-previous-home-address-moveto-date'
      ],
      titleField: 'new-renew-previous-home-address-line1',
      addStep: 'previous-address',
      addAnotherLinkText: 'previous address',
      continueOnEdit: false,
      next: '/upload-proof-address',
      locals: {
        sectionNo: {
          new: 3,
          renew: 4
        }
      }
    },
    '/upload-proof-address': {
      behaviours: [
        SaveDocument('new-renew-proof-address', 'file-upload'),
        RemoveDocument('new-renew-proof-address'),
        UploadFileCounter('new-renew-proof-address')
      ],
      fields: ['file-upload'],
      next: '/contact-details',
      locals: {
        sectionNo: {
          new: 4,
          renew: 5
        }
      }
    },
    '/contact-details': {
      fields: ['new-renew-phone-number', 'new-renew-email'],
      next: '/identity-details',
      locals: {
        sectionNo: {
          new: 5,
          renew: 6
        }
      }
    },
    '/identity-details': {
      fields: [
        'new-renew-applicant-Id-type',
        'new-renew-UK-passport-number',
        'new-renew-EU-passport-number',
        'new-renew-Uk-driving-licence-number'
      ],
      forks: [
        {
          target: '/upload-british-passport',
          condition: req =>
            req.sessionModel.get('new-renew-applicant-Id-type') ===
            'UK-passport'
        },
        {
          target: '/upload-passport',
          condition: req =>
            req.sessionModel.get('new-renew-applicant-Id-type') ===
            'EU-passport'
        }
      ],

      locals: {
        sectionNo: {
          new: 6,
          renew: 7
        }
      },
      next: '/upload-driving-licence'
    },
    '/upload-british-passport': {
      behaviours: [
        SaveDocument('new-renew-british-passport', 'file-upload'),
        RemoveDocument('new-renew-british-passport')
      ],
      fields: ['file-upload'],
      next: '/other-licences',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/upload-passport': {
      behaviours: [
        SaveDocument('new-renew-eu-passport', 'file-upload'),
        RemoveDocument('new-renew-eu-passport')
      ],
      fields: ['file-upload'],
      next: '/upload-certificate-conduct',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/upload-driving-licence': {
      behaviours: [
        SaveDocument('new-renew-upload-driving-licence', 'file-upload'),
        RemoveDocument('new-renew-upload-driving-licence')
      ],
      fields: ['file-upload'],
      next: '/other-licences',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/upload-certificate-conduct': {
      behaviours: [
        SaveDocument('new-renew-certificate-conduct', 'file-upload'),
        RemoveDocument('new-renew-certificate-conduct')
      ],
      fields: ['file-upload'],
      next: '/other-licences',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/other-licences': {
      behaviours: [
        ResetSectionSummary(
          ['licenceshistory'],
          'new-renew-other-refused-licence'
        )
      ],
      fields: [
        'new-renew-other-firearms-licence',
        'new-renew-other-shotgun-licence',
        'new-renew-other-refused-licence'
      ],
      forks: [
        {
          target: '/add-licence-refusal',
          continueOnEdit: true,
          condition: {
            field: 'new-renew-other-refused-licence',
            value: 'yes'
          }
        }
      ],
      next: '/criminal-record',
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/add-licence-refusal': {
      behaviours: [AfterDateOfBirth('new-renew-dob')],
      fields: [
        'new-renew-licence-type',
        'new-renew-why-licence-refused',
        'new-renew-licence-refused-date'
      ],
      next: '/licence-history',
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/licence-history': {
      behaviours: [AggregateSaveUpdate, ParseSummaryFields, EditRouteReturn],
      aggregateTo: 'licenceshistory',
      aggregateFrom: [
        'new-renew-licence-type',
        'new-renew-why-licence-refused',
        'new-renew-licence-refused-date'
      ],
      titleField: ['new-renew-licence-type'],
      addStep: 'add-licence-refusal',
      addAnotherLinkText: 'refusal or revocation',
      next: '/criminal-record',
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/criminal-record': {
      behaviours: [
        ResetSectionSummary(
          ['criminalrecordsummary'],
          'new-renew-have-criminal-record'
        )
      ],
      fields: ['new-renew-have-criminal-record'],
      forks: [
        {
          target: '/add-offence',
          continueOnEdit: true,
          condition: {
            field: 'new-renew-have-criminal-record',
            value: 'yes'
          }
        }
      ],
      locals: {
        sectionNo: {
          new: 9,
          renew: 10
        }
      },
      next: '/medical-declaration'
    },
    '/add-offence': {
      behaviours: [AfterDateOfBirth('new-renew-dob')],
      fields: [
        'new-renew-offence-name',
        'new-renew-offence-country',
        'new-renew-offence-date'
      ],
      next: '/criminal-record-summary',
      locals: {
        sectionNo: {
          new: 9,
          renew: 10
        }
      }
    },
    '/criminal-record-summary': {
      behaviours: [AggregateSaveUpdate, ParseSummaryFields, EditRouteReturn],
      aggregateTo: 'criminalrecordsummary',
      aggregateFrom: [
        'new-renew-offence-name',
        'new-renew-offence-country',
        'new-renew-offence-date'
      ],
      titleField: ['new-renew-offence-name'],
      addStep: 'add-offence',
      addAnotherLinkText: 'offence',
      next: '/medical-declaration',
      locals: {
        sectionNo: {
          new: 9,
          renew: 10
        }
      }
    },
    '/medical-declaration': {
      fields: ['medical-declaration'],
      next: '/medical-history',
      locals: {
        sectionNo: {
          new: 10,
          renew: 11
        }
      }
    },
    '/medical-history': {
      behaviours: [
        DeleteRedundantDocuments('new-renew-received-treatment', [
          'new-renew-medical-form'
        ])
      ],
      fields: ['new-renew-has-seen-doctor', 'new-renew-received-treatment'],
      forks: [
        {
          target: '/medical-form',
          continueOnEdit: true,
          condition: {
            field: 'new-renew-received-treatment',
            value: 'yes'
          }
        }
      ],
      next: '/doctor-details',
      locals: {
        sectionNo: {
          new: 11,
          renew: 12
        }
      }
    },
    '/medical-form': {
      behaviours: [
        SaveDocument('new-renew-medical-form', 'file-upload'),
        RemoveDocument('new-renew-medical-form')
      ],
      fields: ['file-upload'],
      next: '/doctor-details',
      locals: {
        sectionNo: {
          new: 11,
          renew: 12
        }
      }
    },
    '/doctor-details': {
      behaviours: [PostcodeValidation],
      fields: [
        'new-renew-doctor-name',
        'new-renew-doctor-address-line-1',
        'new-renew-doctor-address-line-2',
        'new-renew-doctor-town-city',
        'new-renew-doctor-county',
        'new-renew-doctor-postcode',
        'new-renew-doctor-country'
      ],
      next: '/explosives-precursors',
      locals: {
        sectionNo: {
          new: 11,
          renew: 12
        }
      }
    },
    '/explosives-precursors': {
      behaviours: [NoPrecursorOrPoison,
        ResetSectionSummary(
          ['precursors-details-aggregate'],
          'new-renew-regulated-explosives-precursors-options')],
      fields: ['new-renew-regulated-explosives-precursors-options'],
      forks: [
        {
          target: '/select-precursor',
          continueOnEdit: true,
          condition: {
            field: 'new-renew-regulated-explosives-precursors-options',
            value: 'yes'
          }
        }
      ],
      next: '/poisons',
      locals: {
        sectionNo: {
          new: 12,
          renew: 13
        }
      }
    },
    '/select-precursor': {
      fields: ['precursor-field'],
      next: '/precursor-details',
      locals: {
        sectionNo: {
          new: 13,
          renew: 14
        }
      }
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
      next: '/precursors-summary',
      locals: {
        sectionNo: {
          new: 13,
          renew: 14
        }
      }
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
      continueOnEdit: false,
      next: '/poisons',
      locals: {
        sectionNo: {
          new: 13,
          renew: 14
        }
      }
    },
    '/poisons': {
      behaviours: [NoPrecursorOrPoison, ResetSectionSummary(
        ['poisons-details-aggregate'],
        'new-renew-poisons-options')],
      fields: ['new-renew-poisons-options'],
      forks: [
        {
          target: '/select-poisons',
          continueOnEdit: true,
          condition: {
            field: 'new-renew-poisons-options',
            value: 'yes'
          }
        }
      ],
      locals: {
        sectionNo: {
          new: 14,
          renew: 15
        }
      },
      next: '/countersignatory-details'
    },
    '/no-poisons-or-precursors': {
      behaviours: [NoPrecursorPoisonBackLink]
    },
    '/select-poisons': {
      fields: ['poison-field'],
      continueOnEdit: true,
      next: '/poison-details',
      locals: {
        sectionNo: {
          new: 15,
          renew: 16
        }
      }
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
      locals: {
        sectionNo: {
          new: 15,
          renew: 16
        }
      }
    },
    '/poison-summary': {
      behaviours: [
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
      continueOnEdit: false,
      next: '/countersignatory-details',
      locals: {
        sectionNo: {
          new: 15,
          renew: 16
        }
      }
    },
    '/countersignatory-details': {
      fields: [
        'new-renew-countersignatory-title',
        'new-renew-countersignatory-firstname',
        'new-renew-countersignatory-middlename',
        'new-renew-countersignatory-lastname',
        'new-renew-countersignatory-years',
        'new-renew-countersignatory-howyouknow',
        'new-renew-countersignatory-occupation'
      ],
      next: '/countersignatory-address',
      locals: {
        sectionNo: {
          new: 16,
          renew: 17
        }
      }
    },
    '/countersignatory-address': {
      behaviours: [
        SaveCounterSignatoryAddress([
          'new-renew-countersignatory-address-1',
          'new-renew-countersignatory-address-2',
          'new-renew-countersignatory-town-or-city',
          'new-renew-countersignatory-postcode'
        ])
      ],
      fields: [
        'new-renew-countersignatory-address-1',
        'new-renew-countersignatory-address-2',
        'new-renew-countersignatory-town-or-city',
        'new-renew-countersignatory-postcode'
      ],
      next: '/countersignatory-contact',
      locals: {
        sectionNo: {
          new: 17,
          renew: 18
        }
      }
    },
    '/countersignatory-contact': {
      fields: [
        'new-renew-countersignatory-phone-number',
        'new-renew-countersignatory-email'
      ],
      next: '/countersignatory-id',
      locals: {
        sectionNo: {
          new: 18,
          renew: 19
        }
      }
    },
    '/countersignatory-id': {
      behaviours: [DobUnder18Redirect('new-renew-dob', '/birth-certificate')],
      fields: [
        'new-renew-countersignatory-Id-type',
        'new-renew-countersignatory-UK-passport-number',
        'new-renew-countersignatory-EU-passport-number',
        'new-renew-countersignatory-Uk-driving-licence-number'
      ],
      next: '/confirm',
      locals: {
        sectionNo: {
          new: 19,
          renew: 20
        }
      }
    },
    '/birth-certificate': {
      behaviours: [
        SaveDocument('new-renew-birth-certificate', 'file-upload'),
        RemoveDocument('new-renew-birth-certificate')
      ],
      fields: ['file-upload'],
      next: '/confirm',
      locals: {
        sectionNo: {
          new: 19,
          renew: 20
        }
      }
    },
    '/confirm': {
      behaviours: [SummaryPageBehaviour, ConfirmationDisplay, EditRouteStart, ModifySummaryChangeLink],
      sections: require('./sections/summary-data-sections'),
      next: '/declaration',
      locals: {
        sectionNo: {
          new: 20,
          renew: 21
        }
      }
    },
    '/declaration': {
      behaviours: [InitiatePaymentRequest],
      fields: ['new-renew-declaration'],
      locals: {
        sectionNo: {
          new: 21,
          renew: 22
        }
      }
    },
    '/payment-problem': {
      behaviours: [InitiatePaymentRequest]
    },
    '/payment-failed': {
      behaviours: [InitiatePaymentRequest]
    },
    '/payment-cancelled': {},
    '/application-submitted': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [SummaryPageBehaviour, GetPaymentInfo],
      backLink: false,
      clearSession: true
    },
    '/service-problem': {},
    '/exit': {}
  }
};
