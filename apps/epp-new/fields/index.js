const dateComponent = require('hof').components.date;
const titles = require('../../../utilities/constants/titles');
const countries = require('../../../utilities/constants/countries');

module.exports = {
  'new-renew-title': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--s',
    className: ['govuk-select', 'govuk-input--width-2'],
    options: [
      {
        value: '',
        label: 'fields.new-renew-title.options.none_selected'
      }
    ].concat(titles)
  },
  'new-renew-first-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-middle-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-last-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-other-names': {
    mixin: 'radio-group',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    validate: 'required',
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: 'govuk-fieldset__legend govuk-fieldset__legend--s'
    }
  },
  'new-renew-phone-number': {
    mixin: 'input-text',
    validate: ['required', 'internationalPhoneNumber'],
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m'
  },
  'new-renew-email': {
    mixin: 'input-text',
    validate: ['required', 'email'],
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m'
  },
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
  }),
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  })
};
