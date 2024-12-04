const hof = require('hof');
const summary = hof.components.summary;
// const config = require('../../config');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp/fields',
  views: 'apps/epp/views',
  translations: 'apps/epp/translations',
  baseUrl: '/',
  steps: {
    '/': {
    },
    '/application-type': {
      fields: ['name'],
      next: '/your-name'
    },
    '/your-name': {
      fields: ['name'],
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
      fields: ['name'],
     //add fork /other-nationalities
     next:'/home-address'
    },
    '/other-nationalities':{
      fields: ['name'],
      next: '/home-address'
    },
    '/home-address': {
      fields: ['name'],
      //add fork /previous-address
      next: '/upload-proof-address'
    },
    'previous-address':{
      fields: ['name'],
      //add fork /previous-address-summary
      next: '/previous-address-summary'
    },

    '/previous-address-summary':{
      fields: ['name'],
      next: '/upload-proof-address'
    },


    '/confirm': {
      behaviours: ['complete', summary],
      next: '/complete'
    },
    '/complete': {
      backLink: false
    }
  }
};
