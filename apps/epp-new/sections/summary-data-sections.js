'use strict';

const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

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
        step: '/other-names',
        field: 'other-names',
        parse: (value, req) => {
          const otherNameDetails = [];

          const firstName = req.sessionModel.get(
            'new-renew-other-name-first-name'
          );
          const middleName = req.sessionModel.get(
            'new-renew-other-name-middle-name'
          );
          const lastName = req.sessionModel.get(
            'new-renew-other-name-last-name'
          );
          const fullName = [firstName, middleName, lastName]
            .filter(Boolean)
            .join(' ');
          otherNameDetails.push(
            req.sessionModel.get('new-renew-other-name-title'),
            fullName
          );

          const startDate = req.sessionModel.get(
            'new-renew-other-name-start-date'
          );
          if (startDate) {
            const formattedStartDate = dateFormatter.format(
              new Date(startDate)
            );
            otherNameDetails.push(formattedStartDate);
          }

          const stopDate = req.sessionModel.get(
            'new-renew-other-name-stop-date'
          );
          if (stopDate) {
            const formattedStopDate = dateFormatter.format(new Date(stopDate));
            otherNameDetails.push(formattedStopDate);
          }

          const formattedOtherNameDetails = otherNameDetails
            .filter(Boolean)
            .join('\n');
          req.sessionModel.set('otherNameDetails', formattedOtherNameDetails);

          return formattedOtherNameDetails;
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
