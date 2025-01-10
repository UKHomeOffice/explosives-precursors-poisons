'use strict';

const config = require('../../../config');
const dateFormatter = new Intl.DateTimeFormat(
  config.dateLocales,
  config.dateFormat
);

module.exports = {
  sectionHeader: [
    {
      step: '/enter-license-number',
      field: 'new-renew-license-number'
    }
  ],
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
          const otherNameDetails = [
            req.sessionModel.get('new-renew-other-name-title'),
            req.sessionModel.get('new-renew-other-name-first-name')
          ];

          const middleName = req.sessionModel.get('new-renew-other-name-middle-name');
          if (middleName) {
            otherNameDetails.push(middleName);
          }

          otherNameDetails.push(req.sessionModel.get('new-renew-other-name-last-name'));

          const startDate = req.sessionModel.get('new-renew-other-name-start-date');
          if (startDate) {
            const formattedStartDate = dateFormatter.format(new Date(startDate));
            otherNameDetails.push(formattedStartDate);
          }

          const stopDate = req.sessionModel.get('new-renew-other-name-stop-date');
          if (stopDate) {
            const formattedStopDate = dateFormatter.format(new Date(stopDate));
            otherNameDetails.push(formattedStopDate);
          }

          const formattedOtherNameDetails = otherNameDetails.filter(Boolean).join('\n');
          req.sessionModel.set('otherNameDetails', formattedOtherNameDetails);

          return formattedOtherNameDetails;
        }
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
      }
    ]
  }
};
