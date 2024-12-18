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
    },
    {
      step: '/your-details',
      field: 'new-renew-country-nationality'
    },
    {
      step: '/other-nationalities',
      field: 'new-renew-other-country-nationality'
    },
    {
      step: '/other-nationalities',
      field: 'new-renew-from-date',
      parse: date => date && dateFormatter.format(new Date(date))
    },
    {
      step: '/other-nationalities',
      field: 'new-renew-to-date',
      parse: date => date && dateFormatter.format(new Date(date))
    }
  ]
};
