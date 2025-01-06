const title = require('../../../utilities/constants/titles.js');
const dateComponent = require('hof').components.date;

module.exports = {
  'amend-licence-number': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    labelClassName: 'visuallyhidden',
    validate: [
      'required',
      { type: 'maxlength', arguments: [16] },
      { type: 'minlength', arguments: [13] }
    ]
  },
  'amend-name-title': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input--width-2'],
    options: [{
      value: '',
      label: 'fields.amend-name-title.options.none_selected'
    }].concat(title)
  },
  'amend-firstname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-middlename': {
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-lastname': {
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'amend-phone-number': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'internationalPhoneNumber']
  },
  'amend-email': {
    mixin: 'input-text',
    className: ['govuk-input'],
    labelClassName: 'govuk-label--m',
    validate: ['required', 'email']
  },
  'amend-date-of-birth': dateComponent('amend-date-of-birth', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  })
};
