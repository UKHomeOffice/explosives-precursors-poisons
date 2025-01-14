'use strict';

module.exports = {
  'your-name': {
    steps: [
      {
        step: '/your-name',
        field: 'new-renew-title'
      },
      {
        step: '/your-name',
        field: 'new-renew-first-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-middle-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-last-name'
      },
      {
        step: '/your-name',
        field: 'new-renew-other-names'
      }
    ]
  },
  'applicant-details': {
    steps: [
      {
        step: '/licence-number',
        field: 'new-renew-licence-number'
      }
    ]
  },
  'other-licences': {
    steps: [
      {
        step: '/other-license',
        field: 'new-renew-other-firearms-licence'
      },
      {
        step: '/other-license',
        field: 'new-renew-other-shotgun-licence'
      },
      {
        step: '/other-license',
        field: 'new-renew-other-refused-licence'
      },
    ]
  },
  'new-renew-contact-details': {
    steps: [
      {
        step: '/contact-details',
        field: 'new-renew-phone-number'
      },
      {
        step: '/contact-details',
        field: 'new-renew-email'
      }
    ]
  },
  'medical-information': {
    steps: [
      {
        step: '/medical-declaration',
        field: 'medical-declaration',
        // TODO: can this be configured in translation?
        parse: value =>
          value ? 'I have read and agree to the medical declarations' : ''
      },
      {
        step: '/medical-history',
        field: 'new-renew-has-seen-doctor'
      },
      {
        step: '/medical-history',
        field: 'new-renew-received-treatment'
      }
    ]
  }
};
