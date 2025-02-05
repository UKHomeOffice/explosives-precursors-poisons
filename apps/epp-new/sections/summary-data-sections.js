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
  'proof-of-identity': {
    steps: [
      {
        step: '/identity-details',
        field: 'new-renew-applicant-Id-type'
      },
      {
        step: '/identity-details',
        field: 'new-renew-UK-passport-number'
      },
      {
        step: '/identity-details',
        field: 'new-renew-EU-passport-number'
      },
      {
        step: '/identity-details',
        field: 'new-renew-Uk-driving-licence-number'
      },
    {
        step: '/upload-british-passport',
        field: 'new-renew-british-passport',
        parse: (documents, req) => {
            if (
                req.sessionModel
                    .get('steps')
                    .includes('/upload-british-passport') &&
                documents?.length > 0
            ) {
                return documents.map(file => file.name);
            }

            return null;
        }
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
  },
  'countersignatory-details': {
    steps: [
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-title'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-firstname'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-middlename',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-lastname'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-years'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-howyouknow'
      },
      {
        step: '/countersignatory-details',
        field: 'new-renew-countersignatory-occupation'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-address-1'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-address-2',
        parse: value => value || 'Not provided'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-town-or-city'
      },
      {
        step: '/countersignatory-address',
        field: 'new-renew-countersignatory-postcode'
      },
      {
        step: '/countersignatory-contact',
        field: 'new-renew-countersignatory-phone-number'
      },
      {
        step: '/countersignatory-contact',
        field: 'new-renew-countersignatory-email'
      }
    ]
  }
};
