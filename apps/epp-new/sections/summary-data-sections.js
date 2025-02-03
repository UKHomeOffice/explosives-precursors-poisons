'use strict';

const moment = require('moment');

const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

const dateParser = value => {
  if(value && moment(value, 'DD MMMM YYYY').isValid()) {
    return dateFormatter.format(
      new Date(value)
    );
  }
  return value;
};

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
      },
      {
        step: '/other-names-summary',
        field: 'othernames',
        changeLink: '/new-and-renew/other-names-summary',
        parse: (list, req) => {
          if (req.sessionModel.get('new-renew-other-names') === 'no' ||
           !req.sessionModel.get('steps').includes('/other-names-summary')) {
            return null;
          }
          return req.sessionModel.get('othernames')?.aggregatedValues.length > 0 ?
            req.sessionModel.get('othernames').aggregatedValues.map(a => a.fields.map(field => {
              field.parsed = dateParser(field.parsed);
              return field.parsed;
            }).join('\n')).join('\n \n') : null;
        }
      }
    ]
  },
  'applicant-details': {
    steps: [
      {
        step: '/licence-number',
        field: 'new-renew-licence-number'
      },
      {
        step: '/your-details',
        field: 'new-renew-dob',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/your-details',
        field: 'new-renew-birth-place'
      },
      {
        step: '/your-details',
        field: 'new-renew-birth-country'
      },
      {
        step: '/your-details',
        field: 'new-renew-country-nationality'
      },
      {
        step: '/your-details',
        field: 'new-renew-more-nationalities'
      },
      {
        step: '/your-details',
        field: 'new-renew-your-sex'
      },
      {
        step: '/your-details',
        field: 'new-renew-your-height'
      },
      {
        step: '/your-details',
        field: 'new-renew-occupation'
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-other-country-nationality'
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-date-fr',
        parse: date => date && dateFormatter.format(new Date(date))
      },
      {
        step: '/other-nationalities',
        field: 'new-renew-date-to',
        parse: date => date && dateFormatter.format(new Date(date))
      }
    ]
  },
  'current-address-details': {
    steps: [
      {
        step: '/home-address',
        field: 'new-renew-home-address-line1'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-line2'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-town'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-county'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-postcode'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-country'
      },
      {
        step: '/home-address',
        field: 'new-renew-home-address-moveto-date',
        parse: date => date && dateFormatter.format(new Date(date))
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
      }
    ]
  },
  'criminal-record': {
    steps: [
      {
        step: '/criminal-record',
        field: 'new-renew-have-criminal-record'
      }
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
