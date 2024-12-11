const hof = require('hof');
const stepCounter = require('./behaviours/step-counter');
const checkBackLink = require('./behaviours/check-back-link');
const homeRedirection = require('./behaviours/home-redirection');
const summary = hof.components.summary;

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new/fields',
  views: 'apps/epp-new/views',
  translations: 'apps/epp-new/translations',
  baseUrl: '/',
  behaviours: [stepCounter],
  steps: {
    '/application-type':{},
    '/new-and-renew/your-name': {
      behaviours: [checkBackLink, homeRedirection],
      fields: [],
      //add fork for other-names yes
      next: '/new-and-renew/your-details',
      backLink: 'application-type',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/new-and-renew/other-names': {
      fields: [],
      next: '/new-and-renew/other-names-summary',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/new-and-renew/other-names-summary': {
      fields: [],
      next: '/new-and-renew/your-details',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/new-and-renew/your-details': {
      fields: [],
      //add fork /other-nationalities
      next: '/new-and-renew/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/new-and-renew/other-nationalities': {
      fields: [],
      next: '/new-and-renew/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/new-and-renew/home-address': {
      fields: [],
      //add fork /previous-address
      next: '/new-and-renew/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/new-and-renew/previous-address': {
      fields: [],
      //add fork /previous-address-summary
      next: '/new-and-renew/previous-address-summary',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/new-and-renew/previous-address-summary': {
      // should this be /previous-addresses ?
      fields: [],
      next: '/new-and-renew/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/new-and-renew/upload-proof-address': {
      fields: [],
      next: '/new-and-renew/contact-details',
      locals: {
        captionHeading: 'Section 4 of 20'
      }
    },
    '/new-and-renew/contact-details': {
      fields: [],
      next: '/new-and-renew/identity-details',
      locals: {
        captionHeading: 'Section 5 of 20'
      }
    },
    '/new-and-renew/identity-details': {
      fields: [],
      // 3 option for next path
      next: '/new-and-renew/upload-british-passport',
      locals: {
        captionHeading: 'Section 6 of 20'
      }
    },
    '/new-and-renew/upload-british-passport': {
      fields: [],
      next: '/new-and-renew/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/new-and-renew/upload-passport': {
      fields: [],
      next: '/new-and-renew/upload-certificate-conduct',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/new-and-renew/upload-driving-licence': {
      fields: [],
      next: '/new-and-renew/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/new-and-renew/upload-certificate-conduct': {
      fields: [],
      next: '/new-and-renew/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/new-and-renew/other-licences': {
      fields: [],
      //add fork /add-licence-refusal
      next: '/new-and-renew/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/new-and-renew/add-licence-refusal': {
      fields: [],
      next: '/new-and-renew/licence-history',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/new-and-renew/licence-history': {
      fields: [],
      next: '/new-and-renew/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/new-and-renew/criminal-record': {
      fields: [],
      //add fork for /add-offence
      next: '/new-and-renew/add-offence',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/new-and-renew/add-offence': {
      fields: [],
      next: '/new-and-renew/criminal-record-summary',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/new-and-renew/criminal-record-summary': {
      fields: [],
      next: '/new-and-renew/medical-declaration',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/new-and-renew/medical-declaration': {
      fields: [],
      next: '/new-and-renew/medical-history',
      locals: {
        captionHeading: 'Section 10 of 20'
      }
    },
    '/new-and-renew/medical-history': {
      fields: [],
      //add fork for medical-form
      next: '/new-and-renew/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/new-and-renew/medical-form': {
      fields: [],
      next: '/new-and-renew/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/new-and-renew/doctor-details': {
      fields: [],
      next: '/new-and-renew/precursor-or-poison',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/new-and-renew/precursor-or-poison': {
      fields: [],
      next: '/new-and-renew/select-precursor',
      locals: {
        captionHeading: 'Section 12 of 20'
      }
    },
    '/new-and-renew/select-precursor': {
      fields: [],
      next: '/new-and-renew/precursors-summary',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/new-and-renew/precursors-summary': {
      fields: [],
      next: '/new-and-renew/select-poison',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/new-and-renew/select-poison': {
      fields: [],
      next: '/new-and-renew/poison-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/new-and-renew/poison-details': {
      fields: [],
      next: '/new-and-renew/poison-summary',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/new-and-renew/poison-summary': {
      fields: [],
      next: '/new-and-renew/countersignatory-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/new-and-renew/countersignatory-details': {
      fields: [],
      next: '/new-and-renew/countersignatory-address',
      locals: {
        captionHeading: 'Section 15 of 20'
      }
    },
    '/new-and-renew/countersignatory-address': {
      fields: [],
      next: '/new-and-renew/countersignatory-contact',
      locals: {
        captionHeading: 'Section 16 of 20'
      }
    },
    '/new-and-renew/countersignatory-contact': {
      fields: [],
      next: '/new-and-renew/countersignatory-id',
      locals: {
        captionHeading: 'Section 17 of 20'
      }
    },
    '/new-and-renew/countersignatory-id': {
      fields: [],
      //add logic to check if user is 18 to redirect to birth certificate
      next: '/new-and-renew/confirm',
      locals: {
        captionHeading: 'Section 18 of 20'
      }
    },
    '/new-and-renew/birth-certificate': {
      fields: [],
      next: '/new-and-renew/confirm',
      locals: {
        captionHeading: 'Section 18 of 20'
      }
    },
    '/new-and-renew/confirm': {
      behaviours: ['complete', summary],
      next: '/new-and-renew/declaration',
      locals: {
        captionHeading: 'Section 19 of 20'
      }
    },
    '/new-and-renew/declaration': {
      fields: [],
      //verify path name when payment component will be added to service
      next: '/new-and-renew/continue-to-payment',
      locals: {
        captionHeading: 'Section 20 of 20'
      }
    },
    '/new-and-renew/continue-to-payment': {
      next: '/new-and-renew/application-submitted'
    },
    '/new-and-renew/payment-problem': {
      fields: [],
      next: '/new-and-renew/continue-to-payment'
    },
    '/new-and-renew/payment-failed': {
      fields: [],
      next: '/new-and-renew/continue-to-payment'
    },
    '/new-and-renew/payment-cancelled': {
      fields: ['name'],
      next: '/new-and-renew/continue-to-payment'
    },
    '/new-and-renew/application-submitted': {},
    '/new-and-renew/complete': {
      backLink: false
    }
  }
};
