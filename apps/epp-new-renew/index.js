const hof = require('hof');
const summary = hof.components.summary;

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-new-renew/fields',
  views: 'apps/epp-new-renew/views',
  translations: 'apps/epp-new-renew/translations',
  baseUrl: '/',
  steps: {
    '/enter-license-number':{
      fields: ['new-renew-license-number'],
      next: '/your-name'
    },
    '/your-name': {
      fields: ['your-name'],
      //add fork for other-names yes
      next: '/your-details'
    },
    '/other-names': {
      fields: ['name'],
      next: '/other-names-summary'
    },
    '/other-names-summary': {
      fields: ['name'],
      next: '/your-details'
    },
    '/your-details': {
      fields: ['your-details'],
      //add fork /other-nationalities
      next: '/home-address'
    },
    '/other-nationalities': {
      fields: ['name'],
      next: '/home-address'
    },
    '/home-address': {
      fields: ['name'],
      //add fork /previous-address
      next: '/upload-proof-address'
    },
    '/upload-proof-address': {
      fields: ['name'],
      next: '/contact-details'
    },
    '/previous-address': {
      fields: ['name'],
      //add fork /previous-address-summary
      next: '/previous-address-summary'
    },
    '/previous-address-summary': {
      fields: ['name'],
      next: '/upload-proof-address'
    },
    '/contact-details': {
      fields: ['name'],
      next: '/identity-details'
    },
    '/identity-details': {
      fields: ['name'],
      // 3 option for next path
      next: '/upload-british-passport'
    },
    '/upload-british-passport': {
      fields: ['name'],
      next: '/other-licences'
    },
    '/upload-driving-licence': {
      fields: ['name'],
      next: '/other-licences'
    },
    '/upload-passport': {
      fields: ['name'],
      next: '/upload-certificate-conduct'
    },
    '/upload-certificate-conduct': {
      fields: ['name'],
      next: '/other-licences'
    },
    '/other-licences': {
      fields: ['name'],
      //add fork /add-licence-refusal
      next: '/criminal-record'
    },
    '/add-licence-refusal': {
      fields: ['name'],
      next: '/licence-history'
    },
    '/licence-history': {
      fields: ['name'],
      next: '/criminal-record'
    },
    '/criminal-record': {
      fields: ['name'],
      //add fork for /add-offence
      next: '/add-offence'
    },
    '/add-offence': {
      fields: ['name'],
      next: '/criminal-record-summary'
    },
    '/criminal-record-summary': {
      fields: ['name'],
      next: '/medical-declaration'
    },
    '/medical-declaration': {
      fields: ['name'],
      next: '/medical-history'
    },
    '/medical-history': {
      fields: ['name'],
      //add fork for medical-form
      next: '/doctor-details'
    },
    '/medical-form': {
      fields: ['name'],
      next: '/doctor-details'
    },
    '/doctor-details': {
      fields: ['name'],
      next: '/precursor-or-poison'
    },
    '/precursor-or-poison': {
      fields: ['name'],
      next: '/select-precursor'
    },
    '/select-precursor': {
      fields: ['name'],
      next: '/precursors-summary'
    },
    '/precursors-summary': {
      fields: ['name'],
      next: '/select-poison'
    },
    '/select-poison': {
      fields: ['name'],
      next: '/poison-details'
    },
    '/poison-details': {
      fields: ['name'],
      next: '/poison-summary'
    },
    '/poison-summary': {
      fields: ['name'],
      next: '/countersignatory-details'
    },
    '/countersignatory-details': {
      fields: ['name'],
      next: '/countersignatory-address'
    },
    '/countersignatory-address': {
      fields: ['name'],
      next: '/countersignatory-contact'
    },
    '/countersignatory-contact': {
      fields: ['name'],
      next: '/countersignatory-id'
    },
    '/countersignatory-id': {
      fields: ['name'],
      //add logic to check if user is 18 to redirect to birth certificate
      next: '/confirm'
    },
    '/birth-certificate': {
      fields: ['name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete', summary],
      next: '/declaration'
    },
    '/declaration': {
      fields:['name'],
      //verify path name when payment component will be added to service
      next: '/continue-to-payment'
    },
    '/continue-to-payment':{
      next: '/application-submitted'
    },
    '/payment-problem':{
      fields:['name'],
      next: '/continue-to-payment'
    },
    '/payment-failed':{
      fields:['name'],
      next: '/continue-to-payment'
    },
    '/payment-cancelled':{
      fields:['name'],
      next: '/continue-to-payment'
    },
    '/application-submitted': {
    },
    '/complete': {
      backLink: false
    }
  }
};
