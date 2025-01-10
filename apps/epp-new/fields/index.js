const titles = require('../../../utilities/constants/titles');

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
  'medical-declaration': {
    mixin: 'checkbox',
    validate: ['required']
  },
    'new-renew-has-seen-doctor': {
      mixin: 'radio-group',
      options: [
        {value: 'yes'},
        {value: 'no'}
      ],
      validate: ['required'],
      className: ['govuk-radios', 'govuk-radios--inline'],
      legend: {
        className: 'govuk-fieldset__legend'
      }
    },
    'new-renew-received-treatment': {
      mixin: 'radio-group',
      options: [
        {value: 'yes'},
        {value: 'no'}
      ],
      validate: ['required'],
      className: ['govuk-radios', 'govuk-radios--inline'],
      legend: {
        className: 'govuk-fieldset__legend'
      }
    }
};
