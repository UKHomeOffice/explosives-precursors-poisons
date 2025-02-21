const hof = require('hof');
const sectionCounter = require('./behaviours/section-counter');
const checkBackLink = require('./behaviours/check-back-link');
const validateAndRedirect = require('./behaviours/home-redirection');
const filterCountries = require('./behaviours/filter-countries');
const summary = hof.components.summary;
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

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new/fields',
  views: 'apps/epp-new/views',
  translations: 'apps/epp-new/translations',
  baseUrl: '/new-and-renew',
  params: '/:action?/:id?/:edit?',
  behaviours: [sectionCounter],
  steps: {
    '/your-name': {
      behaviours: [
        checkBackLink,
        RemoveEditMode,
        validateAndRedirect,
        ResetSectionSummary('othernames', 'new-renew-other-names')
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
      titleField: ['new-renew-other-name-first-name', 'new-renew-other-name-last-name'],
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
      behaviours: [PostcodeValidation],
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
            return moveToDate && isDateOlderOrEqualTo(moveToDate, 5);
          }
        }
      ],
      next: '/previous-addresses',
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
      fields: [],
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
        RemoveDocument('new-renew-proof-address')
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
            req.sessionModel.get('new-renew-applicant-Id-type') === 'UK-passport'
        },
        {
          target: '/upload-passport',
          condition: req =>
            req.sessionModel.get('new-renew-applicant-Id-type') === 'EU-passport'
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
      fields: [],
      next: '/other-licences',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/other-licences': {
      fields: [
        'new-renew-other-firearms-licence',
        'new-renew-other-shotgun-licence',
        'new-renew-other-refused-licence'
      ],
      forks: [
        {
          target: '/add-licence-refusal',
          condition: {
            field: 'new-renew-other-refused-licence',
            value: 'yes'
          }
        },
        {
          target: '/criminal-record',
          condition: {
            field: 'new-renew-other-refused-licence',
            value: 'no'
          }
        }
      ],
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/add-licence-refusal': {
      fields: [],
      next: '/licence-history',
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/licence-history': {
      fields: [],
      next: '/criminal-record',
      locals: {
        sectionNo: {
          new: 8,
          renew: 9
        }
      }
    },
    '/criminal-record': {
      fields: ['new-renew-have-criminal-record'],
      forks: [
        {
          target: '/add-offence',
          condition: {
            field: 'new-renew-have-criminal-record',
            value: 'yes'
          }
        },
        {
          target: '/medical-declaration',
          condition: {
            field: 'new-renew-have-criminal-record',
            value: 'no'
          }
        }
      ],
      locals: {
        sectionNo: {
          new: 9,
          renew: 10
        }
      }
    },
    '/add-offence': {
      fields: [],
      next: '/criminal-record-summary',
      locals: {
        sectionNo: {
          new: 9,
          renew: 10
        }
      }
    },
    '/criminal-record-summary': {
      fields: [],
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
      fields: [],
      next: '/precursor-or-poison',
      locals: {
        sectionNo: {
          new: 11,
          renew: 12
        }
      }
    },
    '/precursor-or-poison': {
      fields: [],
      next: '/select-precursor',
      locals: {
        sectionNo: {
          new: 12,
          renew: 13
        }
      }
    },
    '/select-precursor': {
      fields: [],
      next: '/precursors-summary',
      locals: {
        sectionNo: {
          new: 13,
          renew: 14
        }
      }
    },
    '/precursors-summary': {
      fields: [],
      next: '/select-poison',
      locals: {
        sectionNo: {
          new: 13,
          renew: 14
        }
      }
    },
    '/select-poison': {
      fields: [],
      next: '/poison-details',
      locals: {
        sectionNo: {
          new: 14,
          renew: 15
        }
      }
    },
    '/poison-details': {
      fields: [],
      next: '/poison-summary',
      locals: {
        sectionNo: {
          new: 14,
          renew: 15
        }
      }
    },
    '/poison-summary': {
      fields: [],
      next: '/countersignatory-details',
      locals: {
        sectionNo: {
          new: 14,
          renew: 15
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
          new: 15,
          renew: 16
        }
      }
    },
    '/countersignatory-address': {
      fields: [
        'new-renew-countersignatory-address-1',
        'new-renew-countersignatory-address-2',
        'new-renew-countersignatory-town-or-city',
        'new-renew-countersignatory-postcode'
      ],
      next: '/countersignatory-contact',
      locals: {
        sectionNo: {
          new: 16,
          renew: 17
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
          new: 17,
          renew: 18
        }
      }
    },
    '/countersignatory-id': {
      fields: [],
      // add logic to check if user is 18 to redirect to birth certificate
      next: '/confirm',
      locals: {
        sectionNo: {
          new: 18,
          renew: 19
        }
      }
    },
    '/birth-certificate': {
      fields: [],
      next: '/confirm',
      locals: {
        sectionNo: {
          new: 18,
          renew: 19
        }
      }
    },
    '/confirm': {
      behaviours: [summary, ConfirmationDisplay, EditRouteStart],
      sections: require('./sections/summary-data-sections'),
      next: '/declaration',
      locals: {
        sectionNo: {
          new: 19,
          renew: 20
        }
      }
    },
    '/declaration': {
      fields: [],
      // verify path name when payment component will be added to service
      next: '/continue-to-payment',
      locals: {
        sectionNo: {
          new: 20,
          renew: 21
        }
      }
    },
    '/continue-to-payment': {
      next: '/application-submitted'
    },
    '/payment-problem': {
      fields: [],
      next: '/continue-to-payment'
    },
    '/payment-failed': {
      fields: [],
      next: '/continue-to-payment'
    },
    '/payment-cancelled': {
      fields: ['name'],
      next: '/continue-to-payment'
    },
    '/application-submitted': {},
    '/complete': {
      backLink: false
    }
  }
};
