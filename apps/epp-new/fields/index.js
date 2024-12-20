const dateComponent = require('hof').components.date;
const countries = require('../../../utilities/constants/countries');

module.exports = {
  'new-renew-other-country-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    labelClassName: 'bold',
    options: [
      {
        value: '',
        label:
          'fields.new-renew-other-country-nationality.options.none_selected'
      }
    ].concat(countries),
    validate: ['required']
  },
  'new-renew-from-date': dateComponent('new-renew-from-date', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['date', 'before']
  }),
  'new-renew-to-date': dateComponent('new-renew-to-date', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['date', 'before']
  })
};
