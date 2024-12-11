const hof = require('hof');
const sectionCounter = require('./behaviours/section-counter');
const checkBackLink = require('./behaviours/check-back-link');
const validateAndRedirect = require('./behaviours/home-redirection');
const summary = hof.components.summary;

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
      fields: [],
      // add fork for other-names yes
      next: '/your-details',
      backLink: '/application-type',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/other-names': {
      fields: [],
      next: '/other-names-summary',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/other-names-summary': {
      fields: [],
      next: '/your-details',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/your-details': {
      fields: [],
      // add fork /other-nationalities
      next: '/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/other-nationalities': {
      fields: [],
      next: '/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/home-address': {
      fields: [],
      // add fork /previous-address
      next: '/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/previous-address': {
      fields: [],
      // add fork /previous-address-summary
      next: '/previous-address-summary',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/previous-address-summary': {
      // should this be /previous-addresses ?
      fields: [],
      next: '/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/upload-proof-address': {
      fields: [],
      next: '/contact-details',
      locals: {
        captionHeading: 'Section 4 of 20'
      }
    },
    '/contact-details': {
      fields: [],
      next: '/identity-details',
      locals: {
        captionHeading: 'Section 5 of 20'
      }
    },
    '/identity-details': {
      fields: [],
      // 3 option for next path
      next: '/upload-british-passport',
      locals: {
        captionHeading: 'Section 6 of 20'
      }
    },
    '/upload-british-passport': {
      fields: [],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-passport': {
      fields: [],
      next: '/upload-certificate-conduct',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-driving-licence': {
      fields: [],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-certificate-conduct': {
      fields: [],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/other-licences': {
      fields: [],
      // add fork /add-licence-refusal
      next: '/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/add-licence-refusal': {
      fields: [],
      next: '/licence-history',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/licence-history': {
      fields: [],
      next: '/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/criminal-record': {
      fields: [],
      // add fork for /add-offence
      next: '/add-offence',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/add-offence': {
      fields: [],
      next: '/criminal-record-summary',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/criminal-record-summary': {
      fields: [],
      next: '/medical-declaration',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/medical-declaration': {
      fields: [],
      next: '/medical-history',
      locals: {
        captionHeading: 'Section 10 of 20'
      }
    },
    '/medical-history': {
      fields: [],
      // add fork for medical-form
      next: '/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/medical-form': {
      fields: [],
      next: '/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/doctor-details': {
      fields: [],
      next: '/precursor-or-poison',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/precursor-or-poison': {
      fields: [],
      next: '/select-precursor',
      locals: {
        captionHeading: 'Section 12 of 20'
      }
    },
    '/select-precursor': {
      fields: [],
      next: '/precursors-summary',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/precursors-summary': {
      fields: [],
      next: '/select-poison',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/select-poison': {
      fields: [],
      next: '/poison-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/poison-details': {
      fields: [],
      next: '/poison-summary',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/poison-summary': {
      fields: [],
      next: '/countersignatory-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/countersignatory-details': {
      fields: [],
      next: '/countersignatory-address',
      locals: {
        captionHeading: 'Section 15 of 20'
      }
    },
    '/countersignatory-address': {
      fields: [],
      next: '/countersignatory-contact',
      locals: {
        captionHeading: 'Section 16 of 20'
      }
    },
    '/countersignatory-contact': {
      fields: [],
      next: '/countersignatory-id',
      locals: {
        captionHeading: 'Section 17 of 20'
      }
    },
    '/countersignatory-id': {
      fields: [],
      // add logic to check if user is 18 to redirect to birth certificate
      next: '/confirm',
      locals: {
        captionHeading: 'Section 18 of 20'
      }
    },
    '/birth-certificate': {
      fields: [],
      next: '/confirm',
      locals: {
        captionHeading: 'Section 18 of 20'
      }
    },
    '/confirm': {
      behaviours: ['complete', summary],
      next: '/declaration',
      locals: {
        captionHeading: 'Section 19 of 20'
      }
    },
    '/declaration': {
      fields: [],
      // verify path name when payment component will be added to service
      next: '/continue-to-payment',
      locals: {
        captionHeading: 'Section 20 of 20'
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
