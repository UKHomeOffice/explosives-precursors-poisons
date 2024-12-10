const hof = require('hof');
const stepCounter = require('./behaviours/step-counter');
const saveApplicationSelection = require('./behaviours/save-application-selection');
const summary = hof.components.summary;

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new-renew/fields',
  views: 'apps/epp-new-renew/views',
  translations: 'apps/epp-new-renew/translations',
  baseUrl: '/',
  behaviours: [stepCounter],
  steps: {
    '/application-type': {
      behaviours: [saveApplicationSelection],
      fields: ['application-type'],
      forks: [
        {
          target: '/your-name',
          condition: {
            field: 'application-type',
            value: 'new'
          }
        },
        {
          target: '/amend/start',
          condition: {
            field: 'application-type',
            value: 'amend'
          }
        },
        {
          target: '/enter-license-number',
          condition: {
            field: 'application-type',
            value: 'renew'
          }
        }
      ],
      next: '/replace/start'
    },
    '/amend/start': {},
    '/replace/start': {},
    '/enter-license-number': {
      fields: ['new-renew-license-number'],
      next: '/your-name',
      locals: {
        captionHeading: 'Section 0 of 20'
      }
    },
    '/your-name': {
      fields: ['your-name'],
      //add fork for other-names yes
      next: '/your-details',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/other-names': {
      fields: ['name'],
      next: '/other-names-summary',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/other-names-summary': {
      fields: ['name'],
      next: '/your-details',
      locals: {
        captionHeading: 'Section 1 of 20'
      }
    },
    '/your-details': {
      fields: ['your-details'],
      //add fork /other-nationalities
      next: '/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/other-nationalities': {
      fields: ['name'],
      next: '/home-address',
      locals: {
        captionHeading: 'Section 2 of 20'
      }
    },
    '/home-address': {
      fields: ['name'],
      //add fork /previous-address
      next: '/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/previous-address': {
      fields: ['name'],
      //add fork /previous-address-summary
      next: '/previous-address-summary',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/previous-address-summary': {
      // should this be /previous-addresses ?
      fields: ['name'],
      next: '/upload-proof-address',
      locals: {
        captionHeading: 'Section 3 of 20'
      }
    },
    '/upload-proof-address': {
      fields: ['name'],
      next: '/contact-details',
      locals: {
        captionHeading: 'Section 4 of 20'
      }
    },
    '/contact-details': {
      fields: ['name'],
      next: '/identity-details',
      locals: {
        captionHeading: 'Section 5 of 20'
      }
    },
    '/identity-details': {
      fields: ['name'],
      // 3 option for next path
      next: '/upload-british-passport',
      locals: {
        captionHeading: 'Section 6 of 20'
      }
    },
    '/upload-british-passport': {
      fields: ['name'],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-passport': {
      fields: ['name'],
      next: '/upload-certificate-conduct',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-driving-licence': {
      fields: ['name'],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/upload-certificate-conduct': {
      fields: ['name'],
      next: '/other-licences',
      locals: {
        captionHeading: 'Section 7 of 20'
      }
    },
    '/other-licences': {
      fields: ['name'],
      //add fork /add-licence-refusal
      next: '/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/add-licence-refusal': {
      fields: ['name'],
      next: '/licence-history',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/licence-history': {
      fields: ['name'],
      next: '/criminal-record',
      locals: {
        captionHeading: 'Section 8 of 20'
      }
    },
    '/criminal-record': {
      fields: ['name'],
      //add fork for /add-offence
      next: '/add-offence',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/add-offence': {
      fields: ['name'],
      next: '/criminal-record-summary',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/criminal-record-summary': {
      fields: ['name'],
      next: '/medical-declaration',
      locals: {
        captionHeading: 'Section 9 of 20'
      }
    },
    '/medical-declaration': {
      fields: ['name'],
      next: '/medical-history',
      locals: {
        captionHeading: 'Section 10 of 20'
      }
    },
    '/medical-history': {
      fields: ['name'],
      //add fork for medical-form
      next: '/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/medical-form': {
      fields: ['name'],
      next: '/doctor-details',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/doctor-details': {
      fields: ['name'],
      next: '/precursor-or-poison',
      locals: {
        captionHeading: 'Section 11 of 20'
      }
    },
    '/precursor-or-poison': {
      fields: ['name'],
      next: '/select-precursor',
      locals: {
        captionHeading: 'Section 12 of 20'
      }
    },
    '/select-precursor': {
      fields: ['name'],
      next: '/precursors-summary',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/precursors-summary': {
      fields: ['name'],
      next: '/select-poison',
      locals: {
        captionHeading: 'Section 13 of 20'
      }
    },
    '/select-poison': {
      fields: ['name'],
      next: '/poison-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/poison-details': {
      fields: ['name'],
      next: '/poison-summary',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/poison-summary': {
      fields: ['name'],
      next: '/countersignatory-details',
      locals: {
        captionHeading: 'Section 14 of 20'
      }
    },
    '/countersignatory-details': {
      fields: ['name'],
      next: '/countersignatory-address',
      locals: {
        captionHeading: 'Section 15 of 20'
      }
    },
    '/countersignatory-address': {
      fields: ['name'],
      next: '/countersignatory-contact',
      locals: {
        captionHeading: 'Section 16 of 20'
      }
    },
    '/countersignatory-contact': {
      fields: ['name'],
      next: '/countersignatory-id',
      locals: {
        captionHeading: 'Section 17 of 20'
      }
    },
    '/countersignatory-id': {
      fields: ['name'],
      //add logic to check if user is 18 to redirect to birth certificate
      next: '/confirm',
      locals: {
        captionHeading: 'Section 18 of 20'
      }
    },
    '/birth-certificate': {
      fields: ['name'],
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
      fields: ['name'],
      //verify path name when payment component will be added to service
      next: '/continue-to-payment',
      locals: {
        captionHeading: 'Section 20 of 20'
      }
    },
    '/continue-to-payment': {
      next: '/application-submitted'
    },
    '/payment-problem': {
      fields: ['name'],
      next: '/continue-to-payment'
    },
    '/payment-failed': {
      fields: ['name'],
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
