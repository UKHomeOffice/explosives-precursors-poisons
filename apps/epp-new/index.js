const hof = require('hof');
const sectionCounter = require('./behaviours/section-counter');
const checkBackLink = require('./behaviours/check-back-link');
const validateAndRedirect = require('./behaviours/home-redirection');
const summary = hof.components.summary;
const ConfirmationDisplay = require('./behaviours/confirmation-type');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new/fields',
  views: 'apps/epp-new/views',
  translations: 'apps/epp-new/translations',
  baseUrl: '/new-and-renew',
  behaviours: [sectionCounter],
  steps: {
    '/your-name': {
      behaviours: [checkBackLink, validateAndRedirect],
      fields: ['new-renew-title',
        'new-renew-first-name',
        'new-renew-middle-name',
        'new-renew-last-name',
        'new-renew-other-names'],
      forks: [
        {
          target: '/other-names',
          condition: req => req.sessionModel.get('new-renew-other-names') === 'yes'
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
      fields: [],
      next: '/other-names-summary',
      locals: {
        sectionNo: {
          new: 1,
          renew: 2
        }
      }
    },
    '/other-names-summary': {
      fields: [],
      next: '/your-details',
      locals: {
        sectionNo: {
          new: 1,
          renew: 2
        }
      }
    },
    '/your-details': {
      fields: [],
      // add fork /other-nationalities
      next: '/home-address',
      locals: {
        sectionNo: {
          new: 2,
          renew: 3
        }
      }
    },
    '/other-nationalities': {
      fields: [],
      next: '/home-address',
      locals: {
        sectionNo: {
          new: 2,
          renew: 3
        }
      }
    },
    '/home-address': {
      fields: [],
      // add fork /previous-address
      next: '/upload-proof-address',
      locals: {
        sectionNo: {
          new: 3,
          renew: 4
        }
      }
    },
    '/previous-address': {
      fields: [],
      // add fork /previous-address-summary
      next: '/previous-address-summary',
      locals: {
        sectionNo: {
          new: 3,
          renew: 4
        }
      }
    },
    '/previous-address-summary': {
      // should this be /previous-addresses ?
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
      fields: [],
      next: '/contact-details',
      locals: {
        sectionNo: {
          new: 4,
          renew: 5
        }
      }
    },
    '/contact-details': {
      fields: [
        'new-renew-phone-number',
        'new-renew-email'
      ],
      next: '/identity-details',
      locals: {
        sectionNo: {
          new: 5,
          renew: 6
        }
      }
    },
    '/identity-details': {
      fields: [],
      // 3 option for next path
      next: '/upload-british-passport',
      locals: {
        sectionNo: {
          new: 6,
          renew: 7
        }
      }
    },
    '/upload-british-passport': {
      fields: [],
      next: '/other-licences',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/upload-passport': {
      fields: [],
      next: '/upload-certificate-conduct',
      locals: {
        sectionNo: {
          new: 7,
          renew: 8
        }
      }
    },
    '/upload-driving-licence': {
      fields: [],
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
      fields: [],
      // add fork /add-licence-refusal
      next: '/criminal-record',
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
      fields: [],
      // add fork for /add-offence
      next: '/add-offence',
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
      forks: [{
        target: '/medical-form',
        continueOnEdit: true,
        condition: {
          field: 'new-renew-received-treatment',
          value: 'yes'
        }
      }],
      next: '/doctor-details',
      locals: {
        sectionNo: {
          new: 11,
          renew: 12
        }
      }
    },
    '/medical-form': {
      fields: [],
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
      fields: [],
      next: '/countersignatory-address',
      locals: {
        sectionNo: {
          new: 15,
          renew: 16
        }
      }
    },
    '/countersignatory-address': {
      fields: [],
      next: '/countersignatory-contact',
      locals: {
        sectionNo: {
          new: 16,
          renew: 17
        }
      }
    },
    '/countersignatory-contact': {
      fields: [],
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
      behaviours: [summary, ConfirmationDisplay],
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
