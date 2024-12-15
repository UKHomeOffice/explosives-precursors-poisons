const validateAndRedirect = require('./behaviours/home-redirection');

module.exports = {
  name: 'EPP form',
  fields: 'apps/epp-amend/fields',
  views: 'apps/epp-amend/views',
  translations: 'apps/epp-amend/translations',
  baseUrl: '/amend-license',
  steps: {
    '/start': {
      behaviours: [validateAndRedirect],
      backLink: '/application-type',
      next: '/section-two'
    },
    '/section-two': {
      backLink: '/section-one',
      next: '/section-three'
    },
    '/section-three': {
      backLink: '/section-two',
      next: '/section-four'
    },
    '/section-four': {
      backLink: '/section-three',
      next: '/section-five'
    },
    '/section-five': {
      backLink: '/section-four',
      next: '/section-six'
    },
    '/section-six': {
      backLink: '/section-five',
      next: '/section-seven'
    },
    '/section-seven': {
      backLink: '/section-six',
      next: '/section-eight'
    },
    '/section-eight': {
      backLink: '/section-seven',
      next: '/section-nine'
    },
    '/section-nine': {
      backLink: '/section-eight',
      next: '/section-ten'
    },
    '/section-ten': {
      backLink: '/section-nine',
      next: '/section-eleven'
    },
    '/section-eleven': {
      backLink: '/section-ten',
      next: '/section-twelve'
    },
    '/section-twelve': {
      backLink: '/section-eleven',
      next: '/section-thirteen'
    },
    '/section-thirteen': {
      backLink: '/section-twelve',
      next: '/section-fourteen'
    },
    '/section-fourteen': {
      backLink: '/section-thirteen',
      next: '/section-fifteen'
    },
    '/section-fifteen': {
      backLink: '/section-fourteen',
      next: '/section-sixteen'
    },
    '/section-sixteen': {
      backLink: '/section-fifteen',
      next: '/section-seventeen'
    },
    '/section-seventeen': {
      backLink: '/section-sixteen',
      next: '/section-eighteen'
    },
    '/section-eighteen': {
      backLink: '/section-seventeen',
      next: '/section-nineteen'
    },
    '/section-nineteen': {
      backLink: '/section-eighteen',
      next: '/section-twenty'
    },
    '/section-twenty': {
      backLink: '/section-nineteen',
      next: '/confirmation'
    },
    '/confirmation': {
      
    }
  }
};
