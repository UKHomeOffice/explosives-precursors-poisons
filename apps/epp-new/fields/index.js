const dateComponent = require('hof').components.date;
const titles = require('../../../utilities/constants/titles');
const countries = require('../../../utilities/constants/countries');
const { isWithoutFullStop } = require('../../../utilities/helpers');

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
  'new-renew-other-name-title': {
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
  'new-renew-other-name-first-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-other-name-middle-name': {
    mixin: 'input-text',
    validate: ['notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-other-name-last-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: [250] }],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'new-renew-other-name-start-date': dateComponent(
    'new-renew-other-name-start-date',
    {
      mixin: 'input-date',
      legend: { className: 'bold' },
      validate: [
        'required',
        'date',
        { type: 'before', arguments: ['0', 'days'] }
      ]
    }
  ),
  'new-renew-other-name-stop-date': dateComponent(
    'new-renew-other-name-stop-date',
    {
      mixin: 'input-date',
      legend: { className: 'bold' },
      validate: ['date', { type: 'before', arguments: ['0', 'days'] }]
    }
  ),
  'new-renew-has-seen-doctor': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
    validate: ['required'],
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: 'govuk-fieldset__legend'
    }
  },
  'new-renew-received-treatment': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
    validate: ['required'],
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: 'govuk-fieldset__legend'
    }
  },
  'new-renew-other-firearms-licence': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
    validate: ['required'],
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: ['govuk-fieldset__legend', 'bold']
    }
  },
  'new-renew-other-shotgun-licence': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
    validate: ['required'],
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: ['govuk-fieldset__legend', 'bold']
    }
  },
  'new-renew-other-refused-licence': {
    mixin: 'radio-group',
    options: [{ value: 'yes' }, { value: 'no' }],
    validate: ['required'],
    className: ['govuk-radios', 'govuk-radios--inline'],
    legend: {
      className: ['govuk-fieldset__legend', 'bold']
    }
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
  'new-renew-date-fr': dateComponent('new-renew-date-fr', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['date', 'before']
  }),
  'new-renew-date-to': dateComponent('new-renew-date-to', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['date', 'before']
  }),
  'new-renew-dob': dateComponent('new-renew-dob', {
    mixin: 'input-date',
    legend: { className: 'bold' },
    validate: ['required', 'date', 'before']
  }),
  'new-renew-birth-place': {
    mixin: 'input-text',
    labelClassName: 'bold',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-birth-country': {
    mixin: 'select',
    className: ['typeahead'],
    labelClassName: 'bold',
    options: [
      {
        value: '',
        label: 'fields.new-renew-birth-country.options.none_selected'
      }
    ].concat(countries),
    validate: ['required']
  },
  'new-renew-country-nationality': {
    mixin: 'select',
    className: ['typeahead'],
    labelClassName: 'bold',
    options: [
      {
        value: '',
        label: 'fields.new-renew-country-nationality.options.none_selected'
      }
    ].concat(countries),
    validate: ['required']
  },
  'new-renew-more-nationalities': {
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
  'new-renew-your-sex': {
    mixin: 'radio-group',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'x', label: 'X or other' }
    ],
    validate: 'required',
    className: ['govuk-radios'],
    legend: {
      className: 'govuk-fieldset__legend govuk-fieldset__legend--s'
    }
  },
  'new-renew-your-height': {
    mixin: 'input-text',
    className: ['govuk-input', 'govuk-input--width-2'],
    labelClassName: 'bold',
    validate: [
      'required',
      'notUrl',
      isWithoutFullStop,
      'numeric',
      {
        type: 'min',
        arguments: 50
      },
      {
        type: 'max',
        arguments: 300
      }
    ],
    attributes: [{ suffix: 'cm' }]
  },
  'new-renew-occupation': {
    mixin: 'input-text',
    labelClassName: 'bold',
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-home-address-line1': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-home-address-line2': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-home-address-town': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      'required',
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-home-address-county': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    validate: [
      { type: 'minlength', arguments: 2 },
      { type: 'maxlength', arguments: 250 },
      'notUrl'
    ]
  },
  'new-renew-home-address-postcode': {
    mixin: 'input-text',
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    formatter: ['ukPostcode']
  },
  'new-renew-home-address-country': {
    mixin: 'select',
    validate: ['required'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-!-width-two-thirds'],
    options: [
      {
        value: '',
        label: 'fields.new-renew-home-address-country.options.none_selected'
      }
    ].concat(countries)
  },
  'new-renew-home-address-moveto-date': dateComponent(
    'new-renew-home-address-moveto-date',
    {
      mixin: 'input-date',
      legend: { className: 'bold' },
      validate: ['required', 'date', 'before']
    }
  )
};
